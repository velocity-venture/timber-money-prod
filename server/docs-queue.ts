import { EventEmitter } from "events";
import { db } from "./db";
import { documents } from "../shared/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

type Job = { 
  id: string; 
  docId: string; 
  createdAt: number; 
};

class DocumentQueue extends EventEmitter {
  private queue: Job[] = [];
  private working = false;

  enqueue(docId: string) {
    const job: Job = { 
      id: randomUUID(), 
      docId, 
      createdAt: Date.now() 
    };
    this.queue.push(job);
    this.tick();
    return job.id;
  }

  private async tick() {
    if (this.working) return;
    this.working = true;
    
    while (this.queue.length) {
      const job = this.queue.shift()!;
      try {
        this.emit("start", job);
        // Simulate processing work
        await new Promise(resolve => setTimeout(resolve, 50));
        this.emit("done", job);
      } catch (error) {
        this.emit("error", job, error);
      }
    }
    
    this.working = false;
  }

  getQueueLength() {
    return this.queue.length;
  }

  isProcessing() {
    return this.working;
  }
}

export const docsQueue = new DocumentQueue();

// Database status update listeners
docsQueue.on("start", async (job) => {
  try {
    // Only update to processing if currently pending
    // Don't overwrite failed or completed status
    const [doc] = await db.select()
      .from(documents)
      .where(eq(documents.id, job.docId))
      .limit(1);
    
    if (doc && doc.status === "pending") {
      await db.update(documents)
        .set({ 
          status: "processing",
          processedAt: new Date()
        })
        .where(eq(documents.id, job.docId));
    }
  } catch (error) {
    console.error(`Failed to update document ${job.docId} to processing:`, error);
  }
});

docsQueue.on("done", async (job) => {
  try {
    // Only mark as completed if currently processing
    // Don't overwrite failed status
    const [doc] = await db.select()
      .from(documents)
      .where(eq(documents.id, job.docId))
      .limit(1);
    
    if (doc && doc.status === "processing") {
      await db.update(documents)
        .set({ 
          status: "completed",
          processedAt: new Date()
        })
        .where(eq(documents.id, job.docId));
    }
  } catch (error) {
    console.error(`Failed to update document ${job.docId} to completed:`, error);
  }
});

docsQueue.on("error", async (job, error) => {
  try {
    await db.update(documents)
      .set({ 
        status: "failed",
        processedAt: new Date()
      })
      .where(eq(documents.id, job.docId));
    console.error(`Document ${job.docId} processing failed:`, error);
  } catch (dbError) {
    console.error(`Failed to update document ${job.docId} to failed:`, dbError);
  }
});

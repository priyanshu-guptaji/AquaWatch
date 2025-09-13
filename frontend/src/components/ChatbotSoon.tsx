import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ChatbotSoon() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6">Assistant</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Multilingual Assistant</DialogTitle>
        </DialogHeader>
        <div className="prose prose-sm max-w-none">
          <p><strong>Coming soon.</strong> This assistant will support English, Hindi, and regional languages to answer groundwater questions, explain charts, and guide best practices.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

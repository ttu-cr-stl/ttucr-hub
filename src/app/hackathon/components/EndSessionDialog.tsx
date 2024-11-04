"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface EndSessionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  score: number;
  completedChallenges: number;
  totalChallenges: number;
}

export function EndSessionDialog({
  isOpen,
  onClose,
  onConfirm,
  score,
  completedChallenges,
  totalChallenges,
}: EndSessionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border border-red-500/20 bg-black text-white">
        <DialogHeader>
          <DialogTitle className="text-red-500">End Session</DialogTitle>
          <DialogDescription className="text-gray-400">
            Are you sure you want to end your hackathon session? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <Card className="bg-black/50 border border-gray-800 p-4 my-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Current Score</span>
              <span className="text-green-500 font-mono">{score}</span>
            </div>
            <Separator className="bg-gray-800" />
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Challenges Completed</span>
              <span className="text-green-500 font-mono">
                {completedChallenges} / {totalChallenges}
              </span>
            </div>
          </div>
        </Card>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="bg-red-500/20 text-red-500 hover:bg-red-500/30"
          >
            End Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 
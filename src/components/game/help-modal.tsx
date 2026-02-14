"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">How to Play</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-sm">
          <p>
            Decode the daily acronym into its full-text phrase in 5 attempts.
          </p>
          
          <div className="space-y-2">
            <h3 className="font-bold uppercase">Feedback</h3>
            <p>After each guess, the color of the boxes will change to show how close your guess was to the phrase.</p>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">G</div>
              <p>The word is correct and in the right position.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-white font-bold text-xs">Y</div>
              <p>The word is in the phrase but in the wrong position.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-400 rounded flex items-center justify-center text-white font-bold text-xs">X</div>
              <p>The word is not in the phrase at all.</p>
            </div>
          </div>

          <div className="pt-2">
            <p className="font-medium">A new ACRONYMLE will be available each day!</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

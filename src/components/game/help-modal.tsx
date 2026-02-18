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

          <div className="space-y-3">
            <h3 className="font-bold uppercase">Example</h3>
            <div className="flex gap-1 mb-1">
              <div className="w-8 h-8 flex items-center justify-center font-bold text-xl border-2 rounded">F</div>
              <div className="w-8 h-8 flex items-center justify-center font-bold text-xl border-2 rounded">B</div>
              <div className="w-8 h-8 flex items-center justify-center font-bold text-xl border-2 rounded">I</div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <div className="px-2 py-1 bg-green-500 text-white rounded font-bold min-w-[80px] text-center">Federal</div>
                <span>Correct word, correct spot!</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="px-2 py-1 bg-yellow-400 text-white rounded font-bold min-w-[80px] text-center">Bureu</div>
                <span>Almost! Correct word, wrong spot.</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="px-2 py-1 bg-gray-400 text-white rounded font-bold min-w-[80px] text-center">Island</div>
                <span>Not in the phrase.</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-bold uppercase">Feedback Colors</h3>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white font-bold text-[10px]">G</div>
              <p>Correct word and position.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center text-white font-bold text-[10px]">Y</div>
              <p>Wrong spot, or only 1 letter off.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-yellow-400/50 rounded flex items-center justify-center text-white font-bold text-[10px]">Y</div>
              <p>Close! This word is 2 letters away.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center text-white font-bold text-[10px]">X</div>
              <p>Not in the phrase at all.</p>
            </div>
          </div>

          <div className="pt-2 border-t text-center">
            <p className="font-bold">A new ACRONYMLE every day!</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

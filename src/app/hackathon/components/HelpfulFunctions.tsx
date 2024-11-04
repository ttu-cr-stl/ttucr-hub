"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface HelpfulFunction {
  name: string;
  description: string;
  example: string;
}

interface HelpfulFunctionsProps {
  functions: HelpfulFunction[];
}

export function HelpfulFunctions({ functions }: HelpfulFunctionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!functions.length) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-auto hover:bg-transparent hover:text-[#4AF626] flex items-center gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          <span className="text-xs">Helpful Functions</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-black/95 border border-[#4AF626]/30">
        <DialogHeader>
          <DialogTitle className="text-[#4AF626]">Available Helper Functions</DialogTitle>
        </DialogHeader>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxHeight: '60vh',
              overflowY: 'auto'
            }}
          >
            {functions.map((func, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(74, 246, 38, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <h4 className="text-sm font-mono text-[#4AF626] font-medium">{func.name}</h4>
                <p className="text-xs text-[#4AF626]/70">{func.description}</p>
                <pre className="text-xs bg-black/50 p-2 rounded font-mono text-[#4AF626]/60 overflow-x-auto">
                  {func.example}
                </pre>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
} 
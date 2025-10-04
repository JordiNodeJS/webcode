"use client"

import { ExternalLink, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface StatisticData {
  title: string
  percentage: string
  description: string
  source: string
  sourceUrl?: string
  detailedExplanation: string
  context: string
  impact: string
  methodology?: string
}

interface StatisticsModalProps {
  isOpen: boolean
  onClose: () => void
  statistic: StatisticData | null
}

export function StatisticsModal({ isOpen, onClose, statistic }: StatisticsModalProps) {
  if (!statistic) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-4 border-primary/30 bg-gradient-to-br from-background to-primary/5 shadow-brutal">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl md:text-3xl font-black text-primary">
              {statistic.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-primary/10"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-center">
            <div className="text-6xl md:text-7xl font-black text-primary mb-2">
              {statistic.percentage}
            </div>
            <p className="text-lg md:text-xl font-semibold text-muted-foreground">
              {statistic.description}
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Source Information */}
          <div className="bg-muted/50 p-6 rounded-2xl border-2 border-primary/20">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-primary" />
              Official Source
            </h3>
            <p className="font-semibold mb-2">{statistic.source}</p>
            {statistic.sourceUrl && (
              <a
                href={statistic.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                View complete study
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Detailed Explanation */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Detailed Explanation</h3>
            <p className="text-muted-foreground leading-relaxed">
              {statistic.detailedExplanation}
            </p>
          </div>

          {/* Context */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Context</h3>
            <p className="text-muted-foreground leading-relaxed">
              {statistic.context}
            </p>
          </div>

          {/* Impact */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Impact</h3>
            <p className="text-muted-foreground leading-relaxed">
              {statistic.impact}
            </p>
          </div>

          {/* Methodology */}
          {statistic.methodology && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Methodology</h3>
              <p className="text-muted-foreground leading-relaxed">
                {statistic.methodology}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-primary/20">
            <Button
              onClick={onClose}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Close
            </Button>
            {statistic.sourceUrl && (
              <Button
                variant="outline"
                onClick={() => window.open(statistic.sourceUrl, '_blank')}
                className="flex-1 border-2 border-primary/30 hover:bg-primary/10"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Source
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
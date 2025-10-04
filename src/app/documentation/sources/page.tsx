"use client"

import { ArrowLeft, CheckCircle, ExternalLink, FileText, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { WSFadeIn } from '@/components/animations/ws-fade-in'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatisticsModal } from '@/components/ui/statistics-modal'


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

export default function DocumentationSourcesPage() {
  const [selectedStatistic, setSelectedStatistic] = useState<StatisticData | null>(null)

  const _statisticsData = {
    pmirequirements: {
      title: "Inadequate requirements collection",
      percentage: "37%",
      description: "Primary cause of project failure according to PMI 2014",
      source: "Project Management Institute (PMI) - Pulse of the Profession 2014",
      sourceUrl: "https://www.pmi.org/learning/thought-leadership/pulse/the-high-cost-of-low-performance-2014",
      detailedExplanation: "The PMI 2014 study identified that 37% of failed projects are specifically due to 'inadequate requirements collection'. This means organizations are not properly capturing the client's real needs, leading to misunderstandings, constant scope changes, and ultimately project failure.",
      context: "This percentage increased from 32% in 2013, indicating a growing trend in the importance of proper requirements management. High-performing organizations reported only 11% of failures due to this cause, demonstrating the direct correlation between requirements management maturity and project success.",
      impact: "Low-performing organizations experience that more than half of their projects fail primarily due to poor requirements management, costing them nearly 10 cents for every dollar invested.",
      methodology: "PMI surveyed more than 2,000 project management professionals from organizations of various sizes and sectors, using robust statistical methodologies to ensure data representativeness."
    },
    iagconsulting: {
      title: "Companies with low maturity level",
      percentage: "74%",
      description: "In requirements management according to IAG Consulting 2009",
      source: "IAG Consulting - Business Analysis Benchmark 2009",
      detailedExplanation: "IAG Consulting's study evaluated organizations' maturity level in requirements management using a 5-level scale. 74% of companies were positioned at levels 1-2 (low maturity level), meaning they lack systematic and documented processes for effectively managing requirements.",
      context: "Companies with low maturity levels (levels 1-2) operate in an ad-hoc manner or with minimally repeatable processes. They don't have standard methodologies, consistent documentation, or established validation processes for requirements management.",
      impact: "Only 54% of these companies achieve their business objectives, taking 35% more time to deliver results and experiencing significant resource waste.",
      methodology: "IAG Consulting analyzed more than 400 projects from 100 organizations, evaluating 15 different dimensions of requirements management maturity, including processes, tools, roles, and metrics."
    },
    economicimpact: {
      title: "Economic waste due to poor management",
      percentage: "5.1%",
      description: "Equivalent to $51 million wasted for every $1,000 million invested",
      source: "Project Management Institute (PMI) - Pulse of the Profession 2014",
      sourceUrl: "https://www.pmi.org/learning/thought-leadership/pulse/the-high-cost-of-low-performance-2014",
      detailedExplanation: "PMI calculated that for every dollar invested in projects and programs, 5.1% is wasted specifically due to poor requirements management. This waste includes rework, uncontrolled scope changes, time lost in misunderstandings, and resources used for unnecessary functionalities.",
      context: "In high-performing organizations, this waste is significantly reduced to 1%, demonstrating that investment in mature requirements management processes has a direct and quantifiable return.",
      impact: "For an organization investing $1,000 million annually in projects, this represents $51 million in direct waste that could be avoided with better requirements management processes.",
      methodology: "PMI used detailed financial analysis of failed projects, calculating the direct and indirect cost of poor requirements management based on data from more than 2,000 organizations."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Navigation */}
        <WSFadeIn delay={0.1}>
          <div className="mb-8">
            <Link href="/sources">
              <Button variant="outline" className="mb-6 border-2 border-primary/30 hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Public Sources
              </Button>
            </Link>
          </div>
        </WSFadeIn>

        <WSFadeIn delay={0.1}>
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
              <FileText className="w-4 h-4 mr-2" />
              Documentation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Sources and <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Statistics</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive documentation of all statistics used in WebCode projects. 
              Complete transparency and verifiable data sources.
            </p>
          </div>
        </WSFadeIn>

        <div className="grid gap-8 md:gap-12">
          {/* Main Statistics */}
          <WSFadeIn delay={0.2}>
            <Card className="border-4 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 shadow-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  Primary Briefing Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-background/80 p-6 rounded-2xl border-2 border-primary/20">
                  <div className="text-center mb-4">
                    <div className="text-5xl md:text-6xl font-black text-primary mb-2">
                      47%
                    </div>
                    <p className="text-lg md:text-xl font-semibold">
                      of failed projects are due to poor requirements management
                    </p>
                  </div>
                  
                  <div className="border-t-2 border-primary/20 pt-4">
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Official Source
                    </h4>
                    <div className="bg-muted/50 p-4 rounded-xl">
                      <p className="font-semibold mb-2">Project Management Institute (PMI)</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pulse of the Profession 2014 - "The High Cost of Low Performance"
                      </p>
                      <a 
                        href="https://www.pmi.org/learning/thought-leadership/pulse/the-high-cost-of-low-performance-2014"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        View complete study
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </WSFadeIn>

          {/* Complementary Statistics */}
          <WSFadeIn delay={0.3}>
            <Card className="border-4 border-accent/30 bg-gradient-to-br from-accent/10 to-secondary/10 shadow-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                  <CheckCircle className="w-8 h-8 text-accent" />
                  Complementary Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* PMI - Inadequate collection */}
                  <div 
                    className="bg-background/80 p-6 rounded-2xl border-2 border-accent/20 cursor-pointer hover:bg-background hover:border-accent/40 transition-all duration-200 hover:shadow-lg"
                    onClick={() => setSelectedStatistic(_statisticsData.pmirequirements)}
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-accent mb-2">
                        37%
                      </div>
                      <p className="font-semibold">
                        Inadequate requirements collection
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Primary cause of project failure (PMI 2014)
                      </p>
                      <p className="text-xs text-accent/70 mt-2 font-medium">
                        Click for more details →
                      </p>
                    </div>
                  </div>

                  {/* IAG Consulting */}
                  <div 
                    className="bg-background/80 p-6 rounded-2xl border-2 border-secondary/20 cursor-pointer hover:bg-background hover:border-secondary/40 transition-all duration-200 hover:shadow-lg"
                    onClick={() => setSelectedStatistic(_statisticsData.iagconsulting)}
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-secondary mb-2">
                        74%
                      </div>
                      <p className="font-semibold">
                        Companies with low maturity level
                      </p>
                      <p className="text-sm text-muted-foreground">
                        In requirements management (IAG Consulting 2009)
                      </p>
                      <p className="text-xs text-secondary/70 mt-2 font-medium">
                        Click for more details →
                      </p>
                    </div>
                  </div>

                  {/* Economic Impact */}
                  <div 
                    className="bg-background/80 p-6 rounded-2xl border-2 border-primary/20 md:col-span-2 cursor-pointer hover:bg-background hover:border-primary/40 transition-all duration-200 hover:shadow-lg"
                    onClick={() => setSelectedStatistic(_statisticsData.economicimpact)}
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-primary mb-2">
                        5.1%
                      </div>
                      <p className="font-semibold">
                        Economic waste due to poor management
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Equivalent to $51 million wasted for every $1,000 million invested
                      </p>
                      <p className="text-xs text-primary/70 mt-2 font-medium">
                        Click for more details →
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </WSFadeIn>

          {/* Methodology and Transparency */}
          <WSFadeIn delay={0.4}>
            <Card className="border-4 border-secondary/30 bg-gradient-to-br from-secondary/10 to-primary/10 shadow-brutal">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">
                  Methodology and Transparency
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Our Principles</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>We only use official and verifiable sources</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Total transparency in our statistics</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Direct links to original sources</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Complete context for each statistic</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Sources Used</h4>
                    <div className="space-y-3">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-semibold text-sm">Project Management Institute (PMI)</p>
                        <p className="text-xs text-muted-foreground">World's leading project management organization</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-semibold text-sm">IAG Consulting</p>
                        <p className="text-xs text-muted-foreground">Consultancy specialized in requirements analysis</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 p-6 rounded-2xl border-2 border-primary/20">
                  <h4 className="font-bold text-lg mb-3">Why is source verification important?</h4>
                  <p className="text-sm text-muted-foreground">
                    At WebCode we believe in total transparency. All our statistics are verifiable 
                    and come from recognized organizations. This allows us to build trust with our 
                    clients and provide accurate information for decision making.
                  </p>
                </div>

                <div className="bg-accent/10 p-6 rounded-2xl border-2 border-accent/20">
                  <h4 className="font-bold text-lg mb-3">📅 Relevance of PMI 2014 Study</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Although this study is from 2014, it remains the most recent and reliable reference on 
                    requirements management. Subsequent studies from PMI and other organizations have 
                    focused on digital transformation, agile methodologies, and other aspects, but have not 
                    specifically updated statistics on failures due to poorly defined requirements.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Current context:</strong> The industry has moved towards agile methodologies, 
                    but the fundamental principles of requirements management remain critical for the 
                    success of any project, regardless of the methodology used.
                  </p>
                </div>
              </CardContent>
            </Card>
          </WSFadeIn>
        </div>
      </div>

      {/* Modal */}
      <StatisticsModal 
        isOpen={selectedStatistic !== null}
        onClose={() => setSelectedStatistic(null)}
        statistic={selectedStatistic}
      />
    </div>
  )
}

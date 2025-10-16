"use client";

import Link from "next/link";
import { useState } from "react";
import { WSFadeIn } from "@/components/animations/ws-fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticsModal } from "@/components/ui/statistics-modal";
import {
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  FileText,
  TrendingUp
} from "@/lib/icons";

export default function DocumentationSourcesPageClient() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const openModal = (statistic: string) => setModalOpen(statistic);
  const closeModal = () => setModalOpen(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Navigation */}
        <WSFadeIn delay={0.1}>
          <div className="mb-8">
            <Link href="/sources">
              <Button
                variant="outline"
                className="mb-6 border-2 border-primary/30 hover:bg-primary/10"
              >
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
              Sources and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Statistics
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive documentation of all statistics used in WebCode
              projects. Complete transparency and verifiable data sources.
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
                      <p className="font-semibold mb-2">
                        Project Management Institute (PMI)
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pulse of the Profession 2014 - &quot;The High Cost of
                        Low Performance&quot;
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
                  <button
                    type="button"
                    onClick={() => openModal("pmi-inadequate")}
                    className="bg-background/80 p-6 rounded-2xl border-2 border-accent/20 hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-accent mb-2 group-hover:scale-105 transition-transform">
                        37%
                      </div>
                      <p className="font-semibold">
                        Inadequate requirements collection
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Primary cause of project failure (PMI 2014)
                      </p>
                      <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click for details →
                      </p>
                    </div>
                  </button>

                  {/* IAG Consulting */}
                  <button
                    type="button"
                    onClick={() => openModal("iag-maturity")}
                    className="bg-background/80 p-6 rounded-2xl border-2 border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-accent mb-2 group-hover:scale-105 transition-transform">
                        74%
                      </div>
                      <p className="font-semibold">
                        Companies with low maturity level
                      </p>
                      <p className="text-sm text-muted-foreground">
                        In requirements management (IAG Consulting 2009)
                      </p>
                      <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click for details →
                      </p>
                    </div>
                  </button>

                  {/* Economic Impact */}
                  <button
                    type="button"
                    onClick={() => openModal("economic-impact")}
                    className="bg-background/80 p-6 rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer group md:col-span-2"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-primary mb-2 group-hover:scale-105 transition-transform">
                        5.1%
                      </div>
                      <p className="font-semibold">
                        Economic waste due to poor management
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Equivalent to $51 million wasted for every $1,000
                        million invested
                      </p>
                      <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click for details →
                      </p>
                    </div>
                  </button>
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
                        <p className="font-semibold text-sm">
                          Project Management Institute (PMI)
                        </p>
                        <p className="text-xs text-muted-foreground">
                          World&apos;s leading project management organization
                        </p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-semibold text-sm">IAG Consulting</p>
                        <p className="text-xs text-muted-foreground">
                          Consultancy specialized in requirements analysis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 p-6 rounded-2xl border-2 border-primary/20">
                  <h4 className="font-bold text-lg mb-3">
                    Why is source verification important?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    At WebCode we believe in total transparency. All our
                    statistics are verifiable and come from recognized
                    organizations. This allows us to build trust with our
                    clients and provide accurate information for decision
                    making.
                  </p>
                </div>

                <div className="bg-accent/10 p-6 rounded-2xl border-2 border-accent/20">
                  <h4 className="font-bold text-lg mb-3">
                    📅 Relevance of PMI 2014 Study
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Although this study is from 2014, it remains the most recent
                    and reliable reference on requirements management.
                    Subsequent studies from PMI and other organizations have
                    focused on digital transformation, agile methodologies, and
                    other aspects, but have not specifically updated statistics
                    on failures due to poorly defined requirements.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Current context:</strong> The industry has moved
                    towards agile methodologies, but the fundamental principles
                    of requirements management remain critical for the success
                    of any project, regardless of the methodology used.
                  </p>
                </div>
              </CardContent>
            </Card>
          </WSFadeIn>
        </div>
      </div>

      {/* Modals */}
      <StatisticsModal
        isOpen={modalOpen === "pmi-inadequate"}
        onClose={closeModal}
        title="Inadequate Requirements Collection"
        percentage="37%"
        description="Primary cause of project failure (PMI 2014)"
        source="Project Management Institute (PMI) - Pulse of the Profession 2014"
        sourceUrl="https://www.pmi.org/learning/thought-leadership/pulse/the-high-cost-of-low-performance-2014"
        detailedExplanation="The PMI study identified that inadequate requirements collection is one of the main causes of project failure. This includes not only the lack of requirements gathering, but also incomplete, inaccurate, or outdated collection of client needs."
        context="This problem manifests when project teams do not dedicate sufficient time or resources to fully understand what the client actually needs, or when they do not use structured methodologies for requirements gathering."
        impact="The consequences include significant rework, budget overruns, schedule delays, and ultimately, projects that do not meet client expectations or fail completely."
      />

      <StatisticsModal
        isOpen={modalOpen === "iag-maturity"}
        onClose={closeModal}
        title="Companies with Low Maturity Level"
        percentage="74%"
        description="In requirements management (IAG Consulting 2009)"
        source="IAG Consulting - Business Analysis Benchmark 2009"
        detailedExplanation="IAG Consulting developed a maturity model to evaluate how well organizations manage business requirements. Companies with 'low maturity level' (levels 1-2 of 5) lack structured processes, consistent documentation, and developed requirements management capabilities."
        context="The study evaluated more than 100 organizations and found that most operate with ad-hoc or repeatable but not systematic processes. This means they depend on specific individuals or particular teams rather than having robust organizational processes."
        impact="Companies with low maturity level achieve their business objectives only 54% of the time, take 35% more time to deliver results, and experience significant resource waste due to lack of effective requirements management processes."
      />

      <StatisticsModal
        isOpen={modalOpen === "economic-impact"}
        onClose={closeModal}
        title="Economic Waste Due to Poor Management"
        percentage="5.1%"
        description="For every dollar invested in projects"
        source="Project Management Institute (PMI) - Pulse of the Profession 2014"
        sourceUrl="https://www.pmi.org/learning/thought-leadership/pulse/the-high-cost-of-low-performance-2014"
        detailedExplanation="PMI calculated that organizations waste an average of 5.1% of their total project investment due to poor requirements management. This includes costs of rework, uncontrolled changes, delays, and projects that do not meet original objectives."
        context="This waste translates to $51 million lost for every $1,000 million invested in projects. For an organization that invests $10 million annually in projects, this represents a loss of $510,000 per year just due to poor requirements management."
        impact="The economic impact goes beyond direct waste, including lost opportunities, reputation damage, loss of client trust, and opportunity costs that could have been invested in new successful projects."
      />
    </div>
  );
}

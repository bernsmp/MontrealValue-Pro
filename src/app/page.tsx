import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home as HomeIcon, BarChart3, Calculator, FileText, MapPin, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">MontrealValue Pro</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A Montreal real estate valuation tool that helps homeowners get an accurate home value estimate in 60 seconds. 
            Get professional property valuations with confidence scores and detailed reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/application">
              <Button size="lg" className="text-lg px-8 py-4">
                <Calculator className="mr-2 h-5 w-5" />
                View Starter Kit
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Component Showcase
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Smart Address Lookup</CardTitle>
              <CardDescription>
                Montreal.ca integration for accurate property identification
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Property Questionnaire</CardTitle>
              <CardDescription>
                Intelligent assessment of roof, windows, kitchen, and bathroom conditions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Comparable Sales Analysis</CardTitle>
              <CardDescription>
                Real-time analysis from public listings and market data
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>Professional PDF Reports</CardTitle>
              <CardDescription>
                Generate detailed valuation reports with confidence scores
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-8 w-8 text-red-600 mb-2" />
              <CardTitle>60-Second Estimates</CardTitle>
              <CardDescription>
                Get accurate valuations in under a minute
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <HomeIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle>Mobile Optimized</CardTitle>
              <CardDescription>
                Perfect for on-the-go property valuations
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Development Workflow */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center">Development Workflow</CardTitle>
            <CardDescription className="text-center">
              Built with 5 Day Sprint Framework by Omar Choudhry - Ready for Max&apos;s vision
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold">Project Discussion</h3>
                <p className="text-sm text-gray-600">Define requirements and features</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold">Feature Building</h3>
                <p className="text-sm text-gray-600">Systematic development approach</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold">Local Testing</h3>
                <p className="text-sm text-gray-600">Test on localhost before deployment</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold">Vercel Deployment</h3>
                <p className="text-sm text-gray-600">Deploy to production</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
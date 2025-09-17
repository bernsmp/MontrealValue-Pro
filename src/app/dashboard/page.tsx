import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  Palette, 
  Type, 
  Layout, 
  MousePointer, 
  Settings,
  ExternalLink,
  Github,
  BookOpen,
  Zap
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Component Showcase</h1>
          <p className="text-gray-600">Complete shadcn/ui ecosystem demonstration</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Component Library */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layout className="h-6 w-6 text-blue-600" />
                <CardTitle>Component Library</CardTitle>
              </div>
              <CardDescription>
                Complete shadcn/ui component ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <div className="flex gap-2">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="text-sm text-gray-500">
                <a 
                  href="https://ui.shadcn.com/docs/components" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <ExternalLink className="h-4 w-4" />
                  View all components
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Color Palette */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-6 w-6 text-purple-600" />
                <CardTitle>Color Palette</CardTitle>
              </div>
              <CardDescription>
                Official shadcn/ui color system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="w-full h-8 bg-blue-600 rounded"></div>
                  <p className="text-xs text-gray-600">Blue</p>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-8 bg-green-600 rounded"></div>
                  <p className="text-xs text-gray-600">Green</p>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-8 bg-purple-600 rounded"></div>
                  <p className="text-xs text-gray-600">Purple</p>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-8 bg-orange-600 rounded"></div>
                  <p className="text-xs text-gray-600">Orange</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <a 
                  href="https://ui.shadcn.com/colors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <ExternalLink className="h-4 w-4" />
                  View color system
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Type className="h-6 w-6 text-green-600" />
                <CardTitle>Typography</CardTitle>
              </div>
              <CardDescription>
                Text hierarchy and styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h1 className="text-2xl font-bold">Heading 1</h1>
                <h2 className="text-xl font-semibold">Heading 2</h2>
                <h3 className="text-lg font-medium">Heading 3</h3>
                <p className="text-base">Body text with proper spacing</p>
                <p className="text-sm text-gray-600">Small text for descriptions</p>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Components */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MousePointer className="h-6 w-6 text-red-600" />
                <CardTitle>Interactive Elements</CardTitle>
              </div>
              <CardDescription>
                Hover states and interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button className="w-full hover:bg-blue-700 transition-colors">
                  Hover me
                </Button>
                <Button variant="outline" className="w-full hover:bg-gray-100 transition-colors">
                  Outline hover
                </Button>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                <p className="text-sm">Hover this card</p>
              </div>
            </CardContent>
          </Card>

          {/* Theme System */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-indigo-600" />
                <CardTitle>Theme System</CardTitle>
              </div>
              <CardDescription>
                CSS variables and theming
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="p-3 bg-background border rounded">
                  <p className="text-foreground text-sm">Background & Foreground</p>
                </div>
                <div className="p-3 bg-muted border rounded">
                  <p className="text-muted-foreground text-sm">Muted colors</p>
                </div>
                <div className="p-3 bg-primary border rounded">
                  <p className="text-primary-foreground text-sm">Primary colors</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <a 
                  href="https://ui.shadcn.com/themes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <ExternalLink className="h-4 w-4" />
                  View themes
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Documentation Links */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <CardTitle>Documentation & Resources</CardTitle>
              </div>
              <CardDescription>
                Official shadcn/ui ecosystem documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <a 
                    href="https://ui.shadcn.com/docs/components" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>Component Library</span>
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                  <a 
                    href="https://ui.shadcn.com/themes" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 transition-colors"
                  >
                    <Palette className="h-4 w-4" />
                    <span>Theme System</span>
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                </div>
                <div className="space-y-2">
                  <a 
                    href="https://ui.shadcn.com/colors" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 transition-colors"
                  >
                    <Palette className="h-4 w-4" />
                    <span>Color Palette</span>
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                  <a 
                    href="https://ui.shadcn.com/charts" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 transition-colors"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Charts & Data Viz</span>
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance & Features */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-600" />
                <CardTitle>Framework Features</CardTitle>
              </div>
              <CardDescription>
                Built-in capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>TypeScript Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Responsive Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Accessibility (ARIA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Dark Mode Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Mobile Optimized</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

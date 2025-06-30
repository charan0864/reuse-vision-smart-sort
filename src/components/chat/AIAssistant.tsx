
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Lightbulb, Recycle, AlertCircle, BookOpen, Zap, Microscope } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'general' | 'technical' | 'recycling' | 'environmental';
}

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Welcome to ReuScan\'s Ultra-Advanced AI Assistant! 🤖 I\'m your expert guide for plastic identification, recycling processes, environmental impact, and sustainability solutions. I have comprehensive knowledge of:\n\n🔬 **Technical Analysis**: Molecular structures, chemical properties, manufacturing processes\n♻️ **Recycling Systems**: Global recycling infrastructure, processing methods, quality standards\n🌍 **Environmental Impact**: Pollution data, ecosystem effects, conservation strategies\n📊 **Industry Insights**: Market trends, regulations, innovations\n\nAsk me anything about plastics - from basic identification to advanced polymer chemistry!',
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): { content: string; category: 'general' | 'technical' | 'recycling' | 'environmental' } => {
    const message = userMessage.toLowerCase();
    
    // Technical/Scientific Questions
    if (message.includes('molecular') || message.includes('chemical') || message.includes('polymer') || message.includes('structure') || message.includes('density') || message.includes('melting point')) {
      const technicalResponses = [
        "🔬 **Polymer Chemistry Insights**: Plastics are long-chain polymers with repeating molecular units. PET's structure [-OCH₂CH₂OOC-C₆H₄-CO-]ₙ gives it exceptional clarity and barrier properties. The aromatic rings provide rigidity while ester linkages allow flexibility.\n\n**Density Relationships**: HDPE (0.93-0.97 g/cm³) floats in water, while PET (1.38 g/cm³) sinks. This density difference is crucial for float-sink separation in recycling facilities.\n\n**Thermal Properties**: Glass transition temperatures determine processing conditions. PET: 70°C, PP: -10°C, PS: 100°C. These affect end-use applications and recycling processes.",
        "⚗️ **Advanced Chemical Analysis**: Polymer crystallinity affects properties dramatically. HDPE is 60-80% crystalline (opaque, strong), while LDPE is 50-60% crystalline (flexible, translucent).\n\n**Molecular Weight Distribution**: Higher molecular weight = better mechanical properties but harder processing. Recycling reduces molecular weight by chain scission.\n\n**Additive Chemistry**: Plasticizers (phthalates in PVC), antioxidants (BHT), UV stabilizers (benzotriazoles), and colorants significantly affect recycling compatibility and end-of-life options.",
        "🧪 **Polymerization Mechanisms**: Addition polymerization (PE, PP, PS) vs condensation polymerization (PET, nylon). Different mechanisms create different end-group chemistries affecting degradation pathways.\n\n**Branching Effects**: Linear polymers (HDPE) vs branched (LDPE) dramatically affect processing, crystallization, and final properties. Long-chain branching in LDPE creates unique rheological properties.\n\n**Copolymer Science**: Random, block, and graft copolymers modify properties. PET/PEN copolymers improve barrier properties for specialized packaging applications."
      ];
      return { content: technicalResponses[Math.floor(Math.random() * technicalResponses.length)], category: 'technical' };
    }

    // Recycling Process Questions
    if (message.includes('recycling') || message.includes('process') || message.includes('how to recycle') || message.includes('clean') || message.includes('prepare')) {
      const recyclingResponses = [
        "♻️ **Advanced Recycling Protocols**: Mechanical recycling involves 7 key stages:\n\n1. **Collection & Sorting**: NIR (Near-Infrared) spectroscopy achieves 99%+ accuracy\n2. **Contamination Removal**: Hot caustic wash (80°C, 2% NaOH) removes adhesives\n3. **Size Reduction**: Shredding to 8-12mm flakes optimizes surface area\n4. **Density Separation**: Float-sink tanks separate materials by density\n5. **Washing**: Multi-stage process removes residual contamination\n6. **Melting & Pelletizing**: Controlled temperature profiles prevent degradation\n7. **Quality Testing**: Intrinsic viscosity, color, and contamination analysis\n\n**Pro Tip**: Remove caps before recycling - different plastics contaminate streams!",
        "🏭 **Industrial Recycling Standards**: Food-grade recycling requires decontamination validation. Super-clean recycling achieves 99.9% purity through:\n\n- **Pre-sorting**: Color sorting increases value 15-20%\n- **Advanced washing**: Enzymatic cleaners for protein removal\n- **Chemical depolymerization**: Breaks down polymers to monomers\n- **Solid-state polymerization**: Rebuilds molecular weight\n\n**Quality Metrics**: Intrinsic viscosity >0.70 dl/g for bottle-grade PET. Yellowness index <5 for clear applications. Heavy metal content <100 ppm total.\n\n**Recycling Rates**: PET bottles: 31%, HDPE: 28%, All plastics: 9% globally.",
        "🔄 **Circular Economy Implementation**: Advanced recycling technologies are revolutionizing plastic waste:\n\n**Chemical Recycling**: Pyrolysis (400-800°C, oxygen-free) breaks polymers to monomers. Yields 70-85% recovery rate.\n\n**Enzymatic Recycling**: PETase enzymes depolymerize PET at 70°C in 10-20 hours. Produces virgin-quality monomers.\n\n**Molecular Recycling**: Dissolves polymers without breaking bonds. Allows infinite recycling without quality loss.\n\n**Best Practices**: Sort by resin code, remove all non-plastic components, clean thoroughly with cold water, never mix different plastic types."
      ];
      return { content: recyclingResponses[Math.floor(Math.random() * recyclingResponses.length)], category: 'recycling' };
    }

    // Environmental Impact Questions
    if (message.includes('environment') || message.includes('ocean') || message.includes('pollution') || message.includes('microplastic') || message.includes('impact') || message.includes('climate')) {
      const environmentalResponses = [
        "🌊 **Ocean Plastic Crisis - Scientific Data**: 11 million metric tons of plastic enter oceans annually. Current accumulation: 150 million tons.\n\n**Microplastic Distribution**: \n- Surface waters: 5.25 trillion particles\n- Seafloor sediments: 4-20x higher concentration\n- Marine organisms: Detected in 233 species\n\n**Chemical Impact**: Persistent organic pollutants (POPs) concentrate on plastic surfaces 10⁶ times higher than surrounding water. These transfer to organisms upon ingestion.\n\n**Solutions in Action**: The Ocean Cleanup's System 002 removes 10,000kg annually. Plastic-eating enzyme PETase + MHETase cocktail degrades PET 6x faster than natural enzymes.",
        "🔬 **Microplastic Science**: Particles <5mm from plastic degradation and synthetic textiles.\n\n**Human Exposure**: Average person consumes 5g/week (credit card weight). Sources: bottled water (22x higher than tap), seafood, salt, beer.\n\n**Health Research**: Microplastics cross blood-brain barrier, found in human placenta, blood, lungs. Potential endocrine disruption from BPA, phthalates.\n\n**Mitigation Technologies**: \n- Washing machine filters reduce microfiber release 87%\n- Advanced water treatment removes 90% of microplastics\n- Biodegradable alternatives: PLA, PHA, starch-based polymers\n\n**Natural Degradation**: PE: 450 years, PET: 450+ years, PVC: 1000+ years in marine environment.",
        "🌍 **Climate Change & Plastics**: Plastic lifecycle carbon footprint:\n\n**Production Phase**: \n- 1.8 Gt CO₂ annually (3.4% of global emissions)\n- Natural gas: 80% of production energy\n- Coal: 15% of production energy\n\n**End-of-Life Options**:\n- Mechanical recycling: -0.5 to -1.5 Gt CO₂ potential\n- Incineration with energy recovery: -0.3 Gt CO₂\n- Landfill: +0.4 Gt CO₂ (methane generation)\n\n**Circular Solutions**: Closed-loop recycling could reduce plastic-related emissions 50-70% by 2050. Bio-based plastics offer 20-70% emission reduction vs fossil-based equivalents."
      ];
      return { content: environmentalResponses[Math.floor(Math.random() * environmentalResponses.length)], category: 'environmental' };
    }

    // Plastic Identification Questions
    if (message.includes('identify') || message.includes('type') || message.includes('pet') || message.includes('hdpe') || message.includes('code') || message.includes('number')) {
      const identificationResponses = [
        "🔍 **Professional Plastic Identification Guide**:\n\n**Visual Tests**:\n- **PET (#1)**: Crystal clear, lightweight, makes 'crinkling' sound when squeezed\n- **HDPE (#2)**: Opaque, waxy feel, floats in water, semi-flexible\n- **PVC (#3)**: Rigid, dense, cold to touch, may have strong odor\n- **LDPE (#4)**: Flexible film, stretches before tearing, translucent\n- **PP (#5)**: Semi-rigid, living hinge property, floats in water\n- **PS (#6)**: Brittle, breaks with sharp crack, very lightweight foam\n\n**Burn Test** (CAUTION - professionals only): PET burns with sweet smell, HDPE like paraffin, PVC toxic fumes (avoid!)\n\n**Float Test**: Density separation in water - PE/PP float, others sink.",
        "🧪 **Advanced Identification Techniques**:\n\n**NIR Spectroscopy**: Industry standard, 99%+ accuracy. Identifies polymer type, additives, contamination levels.\n\n**FTIR Analysis**: Identifies functional groups, crystallinity, degradation products. Essential for recycling quality control.\n\n**DSC (Differential Scanning Calorimetry)**: Measures glass transition, melting points, crystallization behavior.\n\n**Home Identification Tips**:\n- Check resin codes (numbers 1-7 in recycling symbol)\n- Feel test: Rigid vs flexible, dense vs lightweight\n- Transparency: Clear (PET), translucent (LDPE), opaque (HDPE)\n- Flexibility: Brittle (PS), flexible (LDPE), semi-rigid (PP)\n\n**Common Misidentifications**: Yogurt containers often PP not PS, detergent bottles HDPE not PP.",
        "📊 **Recycling Code Deep Dive**:\n\n**#1 PET**: 28% of plastic bottles, 95% recycling acceptance, infinite recyclability potential\n**#2 HDPE**: 30% of rigid containers, excellent chemical resistance, 7-10 recycling cycles\n**#3 PVC**: <5% of packaging, specialized recycling only, contains chlorine\n**#4 LDPE**: 15% of films/bags, store drop-off programs, growing acceptance\n**#5 PP**: 25% of containers, fastest-growing recycling category, automotive applications\n**#6 PS**: 8% mostly foam, minimal recycling, environmental concerns\n**#7 Other**: Mixed category, includes bioplastics, generally not recyclable\n\n**Industry Trends**: PP acceptance increased 300% in 5 years, PET chemical recycling scaling rapidly."
      ];
      return { content: identificationResponses[Math.floor(Math.random() * identificationResponses.length)], category: 'technical' };
    }

    // General plastic knowledge questions
    if (message.includes('plastic') || message.includes('what is') || message.includes('tell me about') || message.includes('explain')) {
      const generalResponses = [
        "🌟 **Comprehensive Plastic Overview**: Plastics are synthetic polymers - long chains of repeating molecular units. There are two main categories:\n\n**Thermoplastics** (can be melted and reformed):\n- Polyolefins: PE, PP (57% of global production)\n- Styrenics: PS, ABS (7% of production)\n- Engineering plastics: PET, PVC, nylon (23% of production)\n\n**Thermosets** (permanent chemical bonds):\n- Epoxies, polyurethanes, phenolics (13% of production)\n\n**Global Statistics**: 390 million tons produced annually, 40% packaging, 20% construction, 15% automotive. Only 9% globally recycled, 22% mismanaged waste.",
        "🔬 **Plastic Innovation Timeline**:\n\n**1907**: Bakelite (first synthetic plastic)\n**1935**: Polyethylene discovered by accident\n**1941**: PET invented for military applications\n**1954**: Polypropylene commercialized\n**1973**: PET bottles introduced, revolutionizing beverage industry\n**2020s**: Chemical recycling, bio-based plastics, circular economy\n\n**Modern Innovations**:\n- Self-healing polymers for automotive applications\n- Biodegradable ocean plastics (PHAs)\n- Plastic-eating enzymes (PETase, MHETase)\n- Smart plastics with embedded sensors\n- Ultra-high-performance polymers for aerospace",
        "♻️ **Sustainability Revolution in Plastics**:\n\n**Circular Design Principles**:\n1. Design for disassembly (mono-material packaging)\n2. Chemical compatibility (avoid material mixing)\n3. Barrier-free structures (eliminates multilayer films)\n4. Additive selection (recyclability-compatible)\n\n**Breakthrough Technologies**:\n- **Advanced sorting**: AI-powered optical systems achieve 99.5% purity\n- **Chemical recycling**: Converts waste to virgin-quality materials\n- **Bio-based alternatives**: PLA, PHA, PBS from renewable feedstocks\n- **Digital watermarks**: Enable perfect sortability\n\n**Future Outlook**: 100% recyclable packaging by 2025 (major brands committed), 50% recycled content targets."
      ];
      return { content: generalResponses[Math.floor(Math.random() * generalResponses.length)], category: 'general' };
    }

    // Default response for unmatched queries
    const defaultResponses = [
      "🤖 **I'm here to help with all things plastic!** I can assist with:\n\n🔬 **Technical Questions**: Polymer chemistry, material properties, molecular structures\n♻️ **Recycling Guidance**: Processing methods, quality standards, best practices\n🌍 **Environmental Impact**: Pollution data, ecosystem effects, sustainability solutions\n📊 **Industry Insights**: Market trends, regulations, innovations\n🧪 **Identification Help**: Visual tests, burn tests, density separation\n\nCould you be more specific about what aspect of plastics you'd like to explore? I have comprehensive knowledge across all these areas and more!",
      "💡 **Expert Plastic Knowledge at Your Service!** I specialize in:\n\n**Scientific Analysis**: Molecular structures, crystallinity, thermal properties\n**Processing Technology**: Injection molding, extrusion, blow molding\n**Quality Control**: Testing methods, standards, contamination analysis\n**Regulatory Compliance**: FDA, EU regulations, safety standards\n**Sustainability**: LCA analysis, carbon footprint, circular economy\n\nWhat specific plastic topic interests you most? I can provide detailed technical information, practical guidance, or industry insights!"
    ];
    return { content: defaultResponses[Math.floor(Math.random() * defaultResponses.length)], category: 'general' };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        category: aiResponse.category
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      toast({
        title: "AI Response Generated! 🧠",
        description: "Expert plastic knowledge delivered with technical precision",
      });
    }, 1500 + Math.random() * 1500); // 1.5-3 second response time
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'technical': return <Microscope className="h-4 w-4" />;
      case 'recycling': return <Recycle className="h-4 w-4" />;
      case 'environmental': return <AlertCircle className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'technical': return 'bg-purple-100 text-purple-800';
      case 'recycling': return 'bg-green-100 text-green-800';
      case 'environmental': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const quickQuestions = [
    { text: "How do I identify PET plastic?", icon: <Zap className="h-4 w-4" /> },
    { text: "What's the molecular structure of HDPE?", icon: <Microscope className="h-4 w-4" /> },
    { text: "How does chemical recycling work?", icon: <Recycle className="h-4 w-4" /> },
    { text: "What's the environmental impact of microplastics?", icon: <AlertCircle className="h-4 w-4" /> }
  ];

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] space-y-4 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Ultra-Advanced AI Assistant</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Expert-level plastic knowledge with technical precision and scientific accuracy
        </p>
      </div>

      {/* Quick Questions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <BookOpen className="h-5 w-5" />
            Quick Expert Consultations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start text-left h-auto p-3 hover:bg-green-50 border-green-200"
                onClick={() => setInputMessage(question.text)}
              >
                <span className="flex items-center gap-2 text-xs md:text-sm">
                  {question.icon}
                  {question.text}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Bot className="h-5 w-5 text-green-600" />
            Expert Consultation Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {message.type === 'assistant' && message.category && (
                        <Badge variant="outline" className={`text-xs ${getCategoryColor(message.category)}`}>
                          {getCategoryIcon(message.category)}
                          <span className="ml-1 capitalize">{message.category}</span>
                        </Badge>
                      )}
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-green-500 text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-lg p-3 bg-gray-100 text-gray-900">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                        <Zap className="h-3 w-3 mr-1" />
                        Analyzing
                      </Badge>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about plastics - from molecular chemistry to recycling processes..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputMessage.trim() || isTyping}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Lightbulb, Recycle, AlertCircle, BookOpen, Zap, Microscope, Factory, Globe, Leaf, TrendingUp, Users, Building, Truck, Beaker, TestTube } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'general' | 'technical' | 'recycling' | 'environmental' | 'industrial' | 'policy';
}

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '🤖 **Welcome to ReuScan\'s Ultra-Advanced AI Expert!** I\'m your comprehensive plastic identification and recycling specialist with deep knowledge across:\n\n🔬 **Technical Analysis**: Molecular structures, polymer chemistry, material properties, spectroscopic identification\n♻️ **Recycling Systems**: Global processing methods, quality standards, circular economy, contamination analysis\n🌍 **Environmental Impact**: Ocean pollution, microplastics, climate change, biodegradation, ecosystem effects\n🏭 **Industrial Applications**: Manufacturing processes, product design, sustainability initiatives, regulatory compliance\n📊 **Market Intelligence**: Commodity pricing, supply chains, innovation trends, policy developments\n🧪 **Identification Expertise**: Visual/tactile/burn tests, density separation, NIR spectroscopy, advanced sorting\n\n**I provide expert-level guidance with scientific accuracy and practical solutions. Ask me anything about plastics!**',
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

  const generateAIResponse = (userMessage: string): { content: string; category: 'general' | 'technical' | 'recycling' | 'environmental' | 'industrial' | 'policy' } => {
    const message = userMessage.toLowerCase();
    
    // Enhanced Technical/Scientific Questions
    if (message.includes('molecular') || message.includes('chemical') || message.includes('polymer') || message.includes('structure') || message.includes('density') || message.includes('melting point') || message.includes('thermal') || message.includes('crystalline')) {
      const technicalResponses = [
        "🔬 **Advanced Polymer Science**: Plastics are macromolecules with repeating units. **PET Structure**: [-OCH₂CH₂OOC-C₆H₄-CO-]ₙ provides exceptional clarity through aromatic rings and ester linkages.\n\n**Density Analysis**:\n- HDPE: 0.93-0.97 g/cm³ (floats)\n- PET: 1.38 g/cm³ (sinks)\n- PP: 0.90-0.91 g/cm³ (floats)\n- PVC: 1.20-1.35 g/cm³ (sinks)\n\n**Thermal Properties**:\n- Glass transition temps: PET (70°C), PP (-10°C), PS (100°C)\n- Melting points: HDPE (130°C), PP (165°C), PET (250°C)\n- Processing temperatures affect molecular weight and properties",
        "⚗️ **Crystallinity & Molecular Architecture**: Polymer crystallinity dramatically affects properties:\n\n**HDPE**: 60-80% crystalline → opaque, strong, chemical resistant\n**LDPE**: 50-60% crystalline → flexible, translucent, lower density\n**PET**: 30-40% crystalline → clear, strong barriers\n\n**Molecular Weight Distribution**: Higher MW = better mechanical properties but harder processing. **Recycling Impact**: Chain scission reduces MW by 10-15% per cycle.\n\n**Branching Effects**: Linear (HDPE) vs branched (LDPE) creates different flow properties, crystallization rates, and final performance characteristics.",
        "🧪 **Advanced Chemical Analysis & Identification**:\n\n**Spectroscopic Methods**:\n- **NIR**: 99%+ accuracy, identifies polymer type and additives\n- **FTIR**: Functional groups, crystallinity, degradation products\n- **Raman**: Molecular vibrations, contamination detection\n\n**Thermal Analysis**:\n- **DSC**: Glass transition, melting, crystallization behavior\n- **TGA**: Thermal stability, decomposition temperatures\n- **DMA**: Mechanical properties vs temperature\n\n**Chemical Tests**: Burn tests (sweet=PET, paraffin=PE, acrid=PVC), float tests, stiffness evaluation, transparency assessment"
      ];
      return { content: technicalResponses[Math.floor(Math.random() * technicalResponses.length)], category: 'technical' };
    }

    // Enhanced Recycling Process Questions
    if (message.includes('recycling') || message.includes('process') || message.includes('how to recycle') || message.includes('clean') || message.includes('prepare') || message.includes('sort') || message.includes('contamination')) {
      const recyclingResponses = [
        "♻️ **Professional Recycling Protocols - 7-Stage Process**:\n\n**1. Collection & Pre-sorting**: Color-coded bins, NIR spectroscopy (99.5% accuracy)\n**2. Contamination Assessment**: Remove caps, labels, adhesives, food residue\n**3. Size Reduction**: Shredding to 8-12mm flakes for optimal surface area\n**4. Density Separation**: Float-sink tanks separate by specific gravity\n**5. Advanced Washing**: Multi-stage with surfactants, enzymes, hot caustic (80°C)\n**6. Quality Control**: Intrinsic viscosity testing, color measurement, purity analysis\n**7. Pelletizing**: Controlled temperature profiles prevent thermal degradation\n\n**Key Standards**: IV >0.70 dl/g for bottle-grade PET, <100 ppm heavy metals, yellowness index <5",
        "🏭 **Industrial Recycling Excellence**:\n\n**Mechanical Recycling**: 7-10 cycles possible before significant degradation\n**Chemical Recycling**: Pyrolysis (400-800°C) → 70-85% monomer recovery\n**Enzymatic Recycling**: PETase/MHETase cocktail → virgin-quality output\n**Molecular Recycling**: Dissolution without bond breaking → infinite loops\n\n**Quality Metrics**:\n- Food-grade: 99.9% purity, decontamination validation\n- Bottle-to-bottle: <5 ppm acetaldehyde, clear color\n- Fiber applications: Lower purity acceptable\n\n**Best Practices**: Sort by resin code, remove all non-plastic components, cold water rinse, never mix different types",
        "🔄 **Circular Economy Implementation**:\n\n**Design for Recycling**:\n- Mono-material packaging (eliminate multi-layer films)\n- Compatible additives and colorants\n- Easy-to-remove labels and adhesives\n- Standardized closure systems\n\n**Advanced Technologies**:\n- AI-powered optical sorting (99.7% accuracy)\n- Chemical markers for perfect identification\n- Blockchain tracking systems\n- Digital watermarks for sortability\n\n**Global Statistics**: Current recycling rates: PET bottles (31%), HDPE (28%), overall plastics (9%). **Target**: 50% recycled content by 2030, 100% recyclable packaging by 2025"
      ];
      return { content: recyclingResponses[Math.floor(Math.random() * recyclingResponses.length)], category: 'recycling' };
    }

    // Enhanced Environmental Impact Questions
    if (message.includes('environment') || message.includes('ocean') || message.includes('pollution') || message.includes('microplastic') || message.includes('impact') || message.includes('climate') || message.includes('marine') || message.includes('ecosystem')) {
      const environmentalResponses = [
        "🌊 **Ocean Plastic Crisis - Comprehensive Analysis**:\n\n**Scale of Problem**: 11 million metric tons annually enter oceans, 150 million tons accumulated\n\n**Distribution Patterns**:\n- Surface waters: 5.25 trillion particles\n- Deep ocean: 4-20x surface concentration\n- Shorelines: 40% of global debris\n- Arctic ice: Microplastics in 96% of samples\n\n**Marine Impact**: 233+ species affected, 100,000+ marine mammals die annually, 1M+ seabirds impacted\n\n**Solutions**: The Ocean Cleanup (10,000kg/year removal), plastic-eating enzymes (PETase 6x faster degradation), advanced filtration systems",
        "🔬 **Microplastics - Scientific Evidence**:\n\n**Human Exposure Data**:\n- Average consumption: 5g/week (credit card weight)\n- Sources: Bottled water (22x higher than tap), seafood, salt, beer, honey\n- Body distribution: Blood, lungs, placenta, breast milk\n\n**Health Research**:\n- Blood-brain barrier penetration confirmed\n- Endocrine disruption potential (BPA, phthalates)\n- Inflammatory responses in lung tissue\n- Gut microbiome alterations\n\n**Mitigation Technologies**: Washing machine filters (87% reduction), water treatment upgrades (90% removal), biodegradable alternatives (PLA, PHA, starch-based)",
        "🌍 **Climate Impact & Carbon Footprint**:\n\n**Lifecycle Emissions**:\n- Production: 1.8 Gt CO₂/year (3.4% global emissions)\n- Transportation: 0.2 Gt CO₂/year\n- End-of-life: Variable by treatment method\n\n**End-of-Life Scenarios**:\n- Mechanical recycling: -0.5 to -1.5 Gt CO₂ potential savings\n- Chemical recycling: -0.3 to -0.8 Gt CO₂ savings\n- Incineration with energy recovery: -0.3 Gt CO₂\n- Landfill: +0.4 Gt CO₂ (methane generation)\n\n**Future Projections**: Circular economy could reduce plastic emissions 50-70% by 2050, bio-based plastics offer 20-70% reduction vs fossil-based"
      ];
      return { content: environmentalResponses[Math.floor(Math.random() * environmentalResponses.length)], category: 'environmental' };
    }

    // Enhanced Plastic Identification Questions
    if (message.includes('identify') || message.includes('type') || message.includes('pet') || message.includes('hdpe') || message.includes('code') || message.includes('number') || message.includes('distinguish') || message.includes('recognize')) {
      const identificationResponses = [
        "🔍 **Expert Plastic Identification Matrix**:\n\n**Visual & Tactile Tests**:\n\n**PET (#1)**: Crystal clear, lightweight, 'crinkling' sound, rigid\n**HDPE (#2)**: Opaque/translucent, waxy feel, semi-flexible, floats\n**PVC (#3)**: Rigid, dense, cold touch, possible chlorine odor\n**LDPE (#4)**: Flexible film, stretches before tearing, translucent\n**PP (#5)**: Living hinge property, semi-rigid, floats, waxy surface\n**PS (#6)**: Brittle, sharp crack when broken, very light foam versions\n**Other (#7)**: Mixed materials, multilayer, often non-recyclable\n\n**Professional Tip**: Always check recycling codes first, then use physical tests for confirmation",
        "🧪 **Advanced Laboratory Identification**:\n\n**Instrumental Methods**:\n- **NIR Spectroscopy**: 99.9% accuracy, identifies additives and contaminants\n- **FTIR Analysis**: Molecular fingerprinting, degradation assessment\n- **DSC Analysis**: Thermal transitions, crystallinity measurement\n- **Burn Test** (professionals only): Distinct odors and flame characteristics\n\n**Quick Field Tests**:\n- **Float Test**: PE/PP float in water, others sink\n- **Flexibility Test**: Brittle (PS), flexible (LDPE), semi-rigid (PP)\n- **Transparency**: Clear (PET), translucent (LDPE), opaque (HDPE)\n- **Sound Test**: Metallic (PS), soft (PE), crisp (PET)\n\n**Common Errors**: Yogurt containers (often PP not PS), caps vs bottles (different materials)",
        "📊 **Recycling Codes Deep Analysis**:\n\n**Market Data & Acceptance Rates**:\n\n**#1 PET**: 31% recycling rate, 95% program acceptance, infinite recyclability potential\n**#2 HDPE**: 28% recycling rate, excellent chemical resistance, 7-10 cycle capability\n**#3 PVC**: <5% recycling rate, specialized facilities only, contains 57% chlorine\n**#4 LDPE**: 15% recycling rate, store drop-off programs expanding\n**#5 PP**: 25% recycling rate, fastest growth (300% in 5 years)\n**#6 PS**: 8% recycling rate, mostly foam, environmental concerns\n**#7 Other**: <1% recycling rate, includes bioplastics and composites\n\n**Industry Trends**: PP acceptance rapidly expanding, PET chemical recycling scaling, bio-based #7 codes emerging"
      ];
      return { content: identificationResponses[Math.floor(Math.random() * identificationResponses.length)], category: 'technical' };
    }

    // Enhanced Industrial & Manufacturing Questions
    if (message.includes('manufacturing') || message.includes('industrial') || message.includes('production') || message.includes('factory') || message.includes('supply chain') || message.includes('design') || message.includes('automotive')) {
      const industrialResponses = [
        "🏭 **Industrial Manufacturing Excellence**:\n\n**Production Processes**:\n- **Injection Molding**: 45% of plastic products, precise dimensional control\n- **Blow Molding**: Bottles and containers, excellent wall thickness uniformity\n- **Extrusion**: Films, pipes, profiles, continuous production\n- **Thermoforming**: Packaging, automotive parts, cost-effective for large parts\n\n**Quality Control Standards**:\n- Melt flow index testing for processability\n- Tensile strength and impact resistance verification\n- Color matching (ΔE <1.0 for critical applications)\n- Contamination analysis (<50 ppm for food contact)\n\n**Industry 4.0 Integration**: IoT sensors, predictive maintenance, real-time quality monitoring, AI-powered process optimization",
        "🚗 **Automotive Plastic Applications**:\n\n**Material Selection Criteria**:\n- Weight reduction: 50% lighter than metal equivalents\n- Impact resistance: PP bumpers, PC headlight lenses\n- Temperature stability: Under-hood applications require high-temp plastics\n- UV resistance: Exterior parts need stabilizers\n\n**Recycled Content Integration**:\n- Current: 25% recycled content in non-critical components\n- Target: 50% by 2030 for interior parts\n- Applications: Dashboards, door panels, carpet backing\n\n**Circular Design**: Design for disassembly, material marking, single-polymer components where possible",
        "📦 **Packaging Innovation & Sustainability**:\n\n**Lightweighting Technologies**:\n- Bottle weight reduction: 30% since 2000\n- Barrier enhancement: Multilayer to monolayer conversion\n- Smart packaging: Active and intelligent systems\n\n**Circular Packaging Design**:\n- Mono-material structures (eliminate multilayer complexity)\n- Compatible adhesives and inks\n- Easy-to-remove labels\n- Standardized closure systems\n\n**Major Brand Commitments**: Coca-Cola (100% recyclable packaging), Unilever (50% recycled content), P&G (circular packaging design)"
      ];
      return { content: industrialResponses[Math.floor(Math.random() * industrialResponses.length)], category: 'industrial' };
    }

    // Policy & Regulation Questions
    if (message.includes('policy') || message.includes('regulation') || message.includes('law') || message.includes('government') || message.includes('legislation') || message.includes('epr') || message.includes('extended producer')) {
      const policyResponses = [
        "📋 **Global Plastic Policy Landscape**:\n\n**EU Single-Use Plastics Directive**:\n- Banned items: Cutlery, plates, straws, stirrers, balloon sticks\n- Collection targets: 90% PET bottles by 2029\n- Recycled content: 25% in PET bottles by 2025, 30% by 2030\n- Extended Producer Responsibility (EPR) for packaging\n\n**Extended Producer Responsibility**:\n- Manufacturers responsible for full lifecycle costs\n- Incentivizes design for recyclability\n- Currently implemented: EU, Canada, several US states\n- Covers collection, sorting, recycling infrastructure\n\n**Emerging Legislation**: Plastic credits trading, chemical recycling standards, microplastic regulations",
        "🌏 **International Agreements & Standards**:\n\n**Basel Convention**: Controls transboundary plastic waste movements\n**Global Plastics Treaty**: UN negotiations for binding international agreement\n**ISO Standards**: 17088 (biodegradability), 15270 (compostability)\n\n**National Policies**:\n- **China National Sword**: Restricted plastic waste imports, forced domestic recycling\n- **India Plastic Waste Rules**: EPR, waste processing targets\n- **California SB 54**: 100% recyclable packaging by 2032\n- **UK Plastic Packaging Tax**: £200/tonne for <30% recycled content\n\n**Enforcement Mechanisms**: Fines, import bans, deposit systems, plastic taxes",
        "💼 **Business Impact & Compliance**:\n\n**Regulatory Compliance Requirements**:\n- Supply chain transparency and reporting\n- Recycled content verification and certification\n- End-of-life take-back programs\n- Design for recyclability assessments\n\n**Economic Instruments**:\n- Plastic taxes: UK (£200/tonne), planned EU-wide tax\n- Deposit return systems: 10+ countries implemented\n- Green public procurement: Governments prioritize sustainable products\n\n**Industry Response**: Voluntary commitments often exceed regulatory requirements, collaboration on standards development, investment in circular technologies"
      ];
      return { content: policyResponses[Math.floor(Math.random() * policyResponses.length)], category: 'policy' };
    }

    // Enhanced general plastic knowledge
    if (message.includes('plastic') || message.includes('what is') || message.includes('tell me about') || message.includes('explain') || message.includes('overview') || message.includes('basic') || message.includes('fundamental')) {
      const generalResponses = [
        "🌟 **Comprehensive Plastic Science Overview**:\n\n**Fundamental Chemistry**: Plastics are synthetic polymers - long chains of repeating molecular units (monomers)\n\n**Classification Systems**:\n**By Structure**: Thermoplastics (reformable) vs Thermosets (permanent)\n**By Source**: Fossil-based (95%) vs Bio-based (5%)\n**By Application**: Commodities vs Engineering vs High-performance\n\n**Global Production**: 390+ million tons annually\n**Sector Distribution**: Packaging (40%), Construction (20%), Automotive (10%), Electronics (6%)\n\n**Innovation Timeline**: Bakelite (1907) → Polyethylene (1935) → PET bottles (1973) → Current bio-based and chemical recycling revolution",
        "🔬 **Plastic Performance & Properties**:\n\n**Mechanical Properties**:\n- Tensile strength: 10-100 MPa range\n- Impact resistance: Brittle (PS) to tough (PC)\n- Flexural modulus: Flexible (LDPE) to rigid (PVC)\n\n**Thermal Properties**:\n- Service temperatures: -40°C to +150°C continuous use\n- Glass transition: Determines flexibility at room temperature\n- Crystallinity: Affects transparency, strength, chemical resistance\n\n**Chemical Resistance**: Excellent for most applications, varies by polymer type and chemical exposure\n\n**Barrier Properties**: Gas/moisture transmission rates critical for packaging applications",
        "♻️ **Sustainability & Future Outlook**:\n\n**Current Challenges**:\n- 9% global recycling rate (varies by region/type)\n- 22% mismanaged waste (becomes environmental pollution)\n- Limited mechanical recycling cycles (5-7 typical)\n\n**Breakthrough Solutions**:\n- Chemical recycling: Infinite quality loops possible\n- Bio-based plastics: Renewable feedstock sourcing\n- Biodegradable options: Marine and soil degradation\n- AI-powered sorting: 99%+ accuracy achieved\n\n**Future Vision**: Circular economy with 100% recyclable design, 50%+ recycled content, zero waste to environment by 2050"
      ];
      return { content: generalResponses[Math.floor(Math.random() * generalResponses.length)], category: 'general' };
    }

    // Default comprehensive response
    const defaultResponses = [
      "🤖 **Expert Plastic Consultation Available!** I'm equipped with comprehensive knowledge across:\n\n🔬 **Scientific Analysis**: Polymer chemistry, molecular structures, thermal/mechanical properties\n♻️ **Recycling Technology**: Processing methods, quality standards, circular economy solutions\n🌍 **Environmental Science**: Pollution impacts, microplastics research, biodegradation studies\n🏭 **Industrial Applications**: Manufacturing processes, design optimization, quality control\n📊 **Market Intelligence**: Commodity pricing, supply chains, regulatory developments\n🧪 **Identification Methods**: Visual/tactile tests, spectroscopic analysis, sorting technologies\n\n**Please specify your area of interest or ask any specific question about plastics, recycling, or sustainability!**",
      "💡 **Ready to Assist with Expert-Level Knowledge!** I specialize in:\n\n**Technical Expertise**: Material properties, processing parameters, testing methods\n**Sustainability Solutions**: Circular design, lifecycle assessment, carbon footprint\n**Regulatory Compliance**: Global standards, policy requirements, certification processes\n**Innovation Trends**: Emerging technologies, market developments, research breakthroughs\n**Problem Solving**: Contamination issues, quality problems, process optimization\n\n**What specific aspect of plastic science, recycling, or sustainability would you like to explore? I'm here to provide detailed, accurate, and actionable information!**"
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

    // Simulate AI thinking time for realistic interaction
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
        title: "Expert Analysis Complete! 🧠",
        description: "Comprehensive plastic knowledge delivered with scientific precision",
      });
    }, 1500 + Math.random() * 1500);
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
      case 'industrial': return <Factory className="h-4 w-4" />;
      case 'policy': return <Globe className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'technical': return 'bg-purple-100 text-purple-800';
      case 'recycling': return 'bg-green-100 text-green-800';
      case 'environmental': return 'bg-red-100 text-red-800';
      case 'industrial': return 'bg-blue-100 text-blue-800';
      case 'policy': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const quickQuestions = [
    { text: "How do I identify PET vs HDPE plastic?", icon: <Zap className="h-4 w-4" />, category: "Identification" },
    { text: "What's the molecular structure difference between thermoplastics?", icon: <Microscope className="h-4 w-4" />, category: "Technical" },
    { text: "Explain the complete mechanical recycling process", icon: <Recycle className="h-4 w-4" />, category: "Recycling" },
    { text: "What's the environmental impact of microplastics in oceans?", icon: <AlertCircle className="h-4 w-4" />, category: "Environmental" },
    { text: "How does chemical recycling differ from mechanical recycling?", icon: <Beaker className="h-4 w-4" />, category: "Technology" },
    { text: "Which plastics are food-safe and why?", icon: <TestTube className="h-4 w-4" />, category: "Safety" },
    { text: "How do automotive manufacturers use recycled plastics?", icon: <Truck className="h-4 w-4" />, category: "Industrial" },
    { text: "What are the latest EU plastic packaging regulations?", icon: <Globe className="h-4 w-4" />, category: "Policy" },
    { text: "How accurate are AI-powered plastic sorting systems?", icon: <TrendingUp className="h-4 w-4" />, category: "Innovation" },
    { text: "What biodegradable plastic alternatives exist for packaging?", icon: <Leaf className="h-4 w-4" />, category: "Sustainability" },
    { text: "How do plastic additives affect recyclability?", icon: <Building className="h-4 w-4" />, category: "Materials" },
    { text: "What's the carbon footprint of different plastic types?", icon: <Users className="h-4 w-4" />, category: "Climate" },
    { text: "How can I prepare plastics for optimal recycling?", icon: <Recycle className="h-4 w-4" />, category: "Best Practices" },
    { text: "What are the latest innovations in plastic-eating enzymes?", icon: <Microscope className="h-4 w-4" />, category: "Biotechnology" },
    { text: "How does plastic pollution affect marine ecosystems?", icon: <AlertCircle className="h-4 w-4" />, category: "Marine Impact" },
    { text: "What quality standards exist for recycled plastics?", icon: <TestTube className="h-4 w-4" />, category: "Quality Control" },
    { text: "How do different plastic types perform in circular economy?", icon: <TrendingUp className="h-4 w-4" />, category: "Circular Economy" },
    { text: "What are the health implications of microplastics?", icon: <Beaker className="h-4 w-4" />, category: "Health Sciences" },
    { text: "How can businesses implement zero plastic waste strategies?", icon: <Building className="h-4 w-4" />, category: "Business Strategy" },
    { text: "What role does AI play in plastic waste management?", icon: <Zap className="h-4 w-4" />, category: "AI Technology" }
  ];

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] space-y-4 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Ultra-Advanced AI Expert</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Comprehensive plastic science knowledge with expert-level analysis and solutions
        </p>
      </div>

      {/* Enhanced Quick Questions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <BookOpen className="h-5 w-5" />
            Expert Consultation Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start text-left h-auto p-3 hover:bg-green-50 border-green-200"
                onClick={() => setInputMessage(question.text)}
              >
                <span className="flex items-start gap-2 text-xs">
                  {question.icon}
                  <div>
                    <div className="font-medium">{question.text}</div>
                    <div className="text-gray-500 text-xs mt-1">{question.category}</div>
                  </div>
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
            Expert Analysis & Consultation
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
                        Processing
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
              placeholder="Ask me anything about plastic science, recycling processes, environmental impact, or sustainability..."
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

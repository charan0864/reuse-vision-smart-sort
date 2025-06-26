
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Lightbulb, Recycle, Globe } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Comprehensive and advanced plastic knowledge base
  const advancedPlasticDatabase = {
    // Plastic type 1 - PET
    pet: {
      name: 'PET (Polyethylene Terephthalate)',
      code: '1',
      recyclable: true,
      commonUses: ['Water bottles', 'Soda bottles', 'Food containers', 'Peanut butter jars', 'Salad dressing bottles', 'Fruit juice containers', 'Mouthwash bottles'],
      recyclingProcess: 'PET is highly recyclable through mechanical recycling. It can be turned into new bottles, clothing fibers, carpets, and other products. The process involves collection, sorting, cleaning, shredding, melting, and reforming.',
      preparation: 'Remove caps and labels completely, rinse thoroughly to remove any food residue, crush if possible to save space.',
      facts: 'PET bottles can be recycled into polar fleece jackets, carpeting, and new bottles. One recycled PET bottle can make 4 square feet of carpet or fill for a ski jacket.',
      environmentalImpact: 'Recycling PET saves 60% of the energy needed to make virgin PET and reduces CO2 emissions by 70%.',
      chemicalProperties: 'Clear, lightweight, strong, barrier to gas and moisture. Melting point around 250°C.',
      globalStats: 'PET accounts for about 7% of global plastic production. Recycling rate varies from 20-50% globally.',
      innovations: 'New chemical recycling methods can break PET down to its molecular components for infinite recycling.'
    },
    
    // Plastic type 2 - HDPE
    hdpe: {
      name: 'HDPE (High-Density Polyethylene)',
      code: '2',
      recyclable: true,
      commonUses: ['Milk jugs', 'Laundry detergent bottles', 'Shampoo bottles', 'Butter containers', 'Cereal box liners', 'Shopping bags', 'Trash cans'],
      recyclingProcess: 'HDPE is easily recyclable through mechanical recycling. It maintains quality through multiple recycling cycles.',
      preparation: 'Remove caps, rinse containers thoroughly, ensure they are clean and dry before recycling.',
      facts: 'HDPE can be recycled into new bottles, plastic lumber, park benches, and playground equipment.',
      environmentalImpact: 'Recycling HDPE uses 88% less energy than producing new HDPE from raw materials.',
      chemicalProperties: 'Opaque, chemical resistant, impact resistant. Density 0.93-0.97 g/cm³.',
      globalStats: 'HDPE has one of the highest recycling rates globally at around 30-35%.',
      innovations: 'Advanced sorting technologies are improving HDPE recycling efficiency and quality.'
    },
    
    // Plastic type 3 - PVC
    pvc: {
      name: 'PVC (Polyvinyl Chloride)',
      code: '3',
      recyclable: false,
      commonUses: ['Pipes', 'Window frames', 'Credit cards', 'Some food packaging', 'Vinyl siding', 'Medical tubing', 'Wire insulation'],
      recyclingProcess: 'PVC is rarely accepted in curbside recycling due to chlorine content and processing challenges. Specialized facilities exist.',
      preparation: 'Check for specialized PVC recycling programs in your area. Remove any metal components.',
      facts: 'PVC contains chlorine and can release toxic chemicals including dioxins when burned or processed improperly.',
      environmentalImpact: 'PVC production and disposal can release harmful chemicals into the environment. Incineration releases toxic compounds.',
      chemicalProperties: 'Rigid when pure, flexible with plasticizers. Contains 57% chlorine by weight.',
      globalStats: 'PVC recycling rate is very low, typically under 1% globally.',
      innovations: 'New chemical recycling methods are being developed to safely process PVC waste.'
    },
    
    // Plastic type 4 - LDPE
    ldpe: {
      name: 'LDPE (Low-Density Polyethylene)',
      code: '4',
      recyclable: true,
      commonUses: ['Plastic bags', 'Food wraps', 'Squeezable bottles', 'Bread bags', 'Frozen food bags', 'Bubble wrap', 'Flexible lids'],
      recyclingProcess: 'LDPE films require special collection points at stores, not curbside pickup. The material is processed into new films and products.',
      preparation: 'Take plastic bags and films to store drop-off locations. Ensure items are clean and dry.',
      facts: 'LDPE films can be recycled into composite lumber, trash bags, and new plastic bags. 80% of recycled plastic bags become new bags.',
      environmentalImpact: 'Recycling LDPE helps reduce the billions of plastic bags that end up in oceans and landfills annually.',
      chemicalProperties: 'Flexible, translucent, low density 0.91-0.93 g/cm³. Good chemical resistance.',
      globalStats: 'Only about 5% of plastic bags are currently recycled globally.',
      innovations: 'Advanced washing and processing technologies are improving LDPE film recycling quality.'
    },
    
    // Plastic type 5 - PP
    pp: {
      name: 'PP (Polypropylene)',
      code: '5',
      recyclable: true,
      commonUses: ['Yogurt containers', 'Bottle caps', 'Straws', 'Medicine bottles', 'Chip bags', 'Car parts', 'Textiles'],
      recyclingProcess: 'PP acceptance is growing in recycling programs. It can be mechanically recycled into various products.',
      preparation: 'Clean containers thoroughly, remove labels if possible, check local guidelines for acceptance.',
      facts: 'PP can be recycled into clothing fibers, automotive parts, and storage containers. It maintains properties well through recycling.',
      environmentalImpact: 'PP recycling helps reduce landfill waste and conserves petroleum resources used in virgin production.',
      chemicalProperties: 'Lightweight, heat resistant, chemical resistant. Melting point around 160°C.',
      globalStats: 'PP recycling rates are increasing, currently around 1-3% globally but growing rapidly.',
      innovations: 'Chemical recycling technologies are enabling PP to be recycled back into food-grade applications.'
    },
    
    // Plastic type 6 - PS
    ps: {
      name: 'PS (Polystyrene)',
      code: '6',
      recyclable: false,
      commonUses: ['Disposable cups', 'Takeout containers', 'Foam packaging', 'Egg cartons', 'Insulation', 'CD cases', 'Plastic cutlery'],
      recyclingProcess: 'PS is difficult to recycle and not accepted in most curbside programs due to contamination and economics.',
      preparation: 'Look for specialized polystyrene recycling programs or reduce usage. Some electronics stores accept clean PS.',
      facts: 'PS takes 500+ years to decompose and often breaks into harmful microplastics that enter food chains.',
      environmentalImpact: 'PS is a major contributor to ocean plastic pollution and microplastic contamination in marine life.',
      chemicalProperties: 'Lightweight, insulating, brittle. Can be rigid or foam. Often contains styrene monomer.',
      globalStats: 'Less than 1% of polystyrene is recycled globally. Banned in many cities worldwide.',
      innovations: 'Some companies are developing chemical recycling for PS, but mechanical alternatives are preferred.'
    },
    
    // Plastic type 7 - Other
    other: {
      name: 'Other Plastics (Mixed)',
      code: '7',
      recyclable: false,
      commonUses: ['Some water bottles', 'Sunglasses', 'DVDs', 'Mixed plastic items', 'Complex packaging', 'Electronics', 'Automotive parts'],
      recyclingProcess: 'Type 7 plastics are mixed compositions and generally not recyclable in standard programs.',
      preparation: 'Check with local facilities for specific Type 7 recycling options. Some specialty programs exist.',
      facts: 'Type 7 includes polycarbonate (which may contain BPA), polylactic acid (PLA), and mixed plastic composites.',
      environmentalImpact: 'Mixed plastics are challenging to recycle and often end up in landfills or incineration.',
      chemicalProperties: 'Varies widely depending on composition. May include multiple polymer types.',
      globalStats: 'Recycling rate for Type 7 plastics is near zero in most regions.',
      innovations: 'Advanced sorting technologies using AI and spectroscopy are improving Type 7 identification and processing.'
    }
  };

  const additionalKnowledge = {
    microplastics: {
      definition: 'Plastic particles smaller than 5mm, often invisible to the naked eye',
      sources: 'Breakdown of larger plastics, synthetic clothing fibers, tire wear, cosmetics',
      healthEffects: 'Found in human blood, lungs, and placenta. Long-term effects being studied',
      prevention: 'Proper plastic disposal, reducing single-use plastics, supporting plastic alternatives'
    },
    bioplastics: {
      types: 'PLA (corn-based), PHA (bacteria-produced), starch-based plastics',
      benefits: 'Renewable sources, potentially biodegradable under specific conditions',
      limitations: 'Often require industrial composting, can contaminate recycling streams',
      future: 'Advancing technology making bioplastics more viable for various applications'
    },
    oceanPlastics: {
      scale: '8 million tons of plastic enter oceans annually, 5 trillion pieces currently floating',
      impact: '90% of seabirds have plastic in stomachs, marine animals mistake plastic for food',
      solutions: 'Ocean cleanup projects, preventing plastic entry, developing biodegradable alternatives',
      innovations: 'Plastic-eating enzymes, ocean plastic collection ships, plastic-free packaging'
    },
    circularEconomy: {
      concept: 'Designing out waste, keeping materials in use, regenerating natural systems',
      examples: 'Bottle-to-bottle recycling, plastic-to-fuel conversion, reusable packaging systems',
      challenges: 'Economic incentives, consumer behavior, technology limitations',
      future: 'Extended producer responsibility, deposit return systems, plastic credits'
    }
  };

  const generateAdvancedAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Enhanced greeting with more context
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return "🌱 **Hello! I'm your Advanced Plastic Expert** 👋\n\n" +
             "I'm here to help you navigate the complex world of plastics and recycling! I have extensive knowledge about:\n\n" +
             "🔬 **Plastic Science:** Chemical properties, manufacturing processes, and material behavior\n" +
             "♻️ **Recycling Technologies:** Mechanical vs chemical recycling, emerging innovations\n" +
             "🌊 **Environmental Impact:** Ocean pollution, microplastics, carbon footprint\n" +
             "🏭 **Industry Insights:** Global markets, recycling economics, policy developments\n" +
             "🔮 **Future Solutions:** Bioplastics, circular economy, breakthrough technologies\n\n" +
             "**Ask me anything like:**\n" +
             "• \"How does chemical recycling differ from mechanical recycling?\"\n" +
             "• \"What's the environmental impact of microplastics?\"\n" +
             "• \"Which countries have the best plastic recycling systems?\"\n" +
             "• \"How do I identify plastic types without recycling symbols?\"\n\n" +
             "What would you like to explore today? 🤔";
    }

    // Enhanced plastic type queries with deeper analysis
    for (const [key, plastic] of Object.entries(advancedPlasticDatabase)) {
      if (lowerMessage.includes(plastic.code) || 
          lowerMessage.includes(key) || 
          lowerMessage.includes(plastic.name.toLowerCase()) ||
          plastic.commonUses.some(use => lowerMessage.includes(use.toLowerCase()))) {
        
        return `🔬 **${plastic.name} (Type ${plastic.code}) - Deep Dive Analysis**\n\n` +
               `♻️ **Recyclability:** ${plastic.recyclable ? '✅ Highly Recyclable' : '❌ Difficult to Recycle'}\n\n` +
               `📦 **Common Applications:**\n${plastic.commonUses.map(use => `• ${use}`).join('\n')}\n\n` +
               `🔄 **Recycling Process:** ${plastic.recyclingProcess}\n\n` +
               `📋 **Preparation Steps:** ${plastic.preparation}\n\n` +
               `🧪 **Chemical Properties:** ${plastic.chemicalProperties}\n\n` +
               `📊 **Global Statistics:** ${plastic.globalStats}\n\n` +
               `💡 **Did You Know?** ${plastic.facts}\n\n` +
               `🌍 **Environmental Impact:** ${plastic.environmentalImpact}\n\n` +
               `🚀 **Latest Innovations:** ${plastic.innovations}\n\n` +
               `💭 **Want to know more?** Ask about recycling processes, environmental impact, or innovations in plastic technology!`;
      }
    }

    // Microplastics deep dive
    if (lowerMessage.includes('micro') || lowerMessage.includes('tiny') || lowerMessage.includes('small particles')) {
      return `🔬 **Microplastics: The Hidden Crisis**\n\n` +
             `**What Are Microplastics?**\n${additionalKnowledge.microplastics.definition}\n\n` +
             `**Primary Sources:**\n• ${additionalKnowledge.microplastics.sources.split(', ').join('\n• ')}\n\n` +
             `**Health Implications:**\n• ${additionalKnowledge.microplastics.healthEffects}\n\n` +
             `**Prevention Strategies:**\n• ${additionalKnowledge.microplastics.prevention.split(', ').join('\n• ')}\n\n` +
             `📊 **Shocking Statistics:**\n` +
             `• We consume about 5g of plastic weekly (equivalent to a credit card)\n` +
             `• Microplastics found in 90% of table salt brands globally\n` +
             `• Average person inhales 5-15 plastic particles per hour\n` +
             `• Found in rain, snow, and even remote mountain areas\n\n` +
             `🛡️ **What You Can Do:**\n` +
             `• Use natural fiber clothing when possible\n` +
             `• Install microfiber washing machine filters\n` +
             `• Choose glass or stainless steel containers\n` +
             `• Support microplastic research and legislation`;
    }

    // Bioplastics comprehensive guide
    if (lowerMessage.includes('bio') || lowerMessage.includes('alternative') || lowerMessage.includes('replace') || lowerMessage.includes('sustainable')) {
      return `🌱 **Bioplastics & Sustainable Alternatives: Complete Guide**\n\n` +
             `**Types of Bioplastics:**\n• ${additionalKnowledge.bioplastics.types.split(', ').join('\n• ')}\n\n` +
             `**Key Benefits:**\n• ${additionalKnowledge.bioplastics.benefits.split(', ').join('\n• ')}\n\n` +
             `**Current Limitations:**\n• ${additionalKnowledge.bioplastics.limitations.split(', ').join('\n• ')}\n\n` +
             `**Future Outlook:**\n• ${additionalKnowledge.bioplastics.future}\n\n` +
             `🔍 **Popular Alternatives by Category:**\n\n` +
             `**Food Packaging:**\n• Seaweed-based wraps\n• Mushroom-based packaging\n• Edible films from plant proteins\n\n` +
             `**Single-Use Items:**\n• Bamboo utensils and straws\n• Wheat straw plates and bowls\n• Cornstarch-based bags\n\n` +
             `**Bottles & Containers:**\n• Glass (infinitely recyclable)\n• Stainless steel (durable, reusable)\n• Plant-based PET alternatives\n\n` +
             `⚠️ **Important Notes:**\n` +
             `• "Biodegradable" doesn't always mean better for environment\n` +
             `• Many bioplastics need industrial composting (60°C+ for months)\n` +
             `• Cost is currently 2-5x higher than conventional plastics\n` +
             `• Best approach: Reduce consumption first, then choose alternatives`;
    }

    // Ocean plastics crisis
    if (lowerMessage.includes('ocean') || lowerMessage.includes('sea') || lowerMessage.includes('marine') || lowerMessage.includes('pollution')) {
      return `🌊 **Ocean Plastic Crisis: Facts, Impact & Solutions**\n\n` +
             `**Scale of the Problem:**\n• ${additionalKnowledge.oceanPlastics.scale}\n\n` +
             `**Marine Life Impact:**\n• ${additionalKnowledge.oceanPlastics.impact}\n\n` +
             `**Current Solutions:**\n• ${additionalKnowledge.oceanPlastics.solutions.split(', ').join('\n• ')}\n\n` +
             `**Breakthrough Innovations:**\n• ${additionalKnowledge.oceanPlastics.innovations.split(', ').join('\n• ')}\n\n` +
             `🌍 **Global Hotspots:**\n` +
             `• Great Pacific Garbage Patch (3x size of France)\n` +
             `• Southeast Asian rivers contribute 90% of ocean plastic\n` +
             `• Arctic ice contains microplastics from global currents\n` +
             `• Mediterranean Sea has highest microplastic concentration\n\n` +
             `🎯 **Individual Actions That Matter:**\n` +
             `• Participate in beach cleanups\n` +
             `• Choose reusable alternatives for single-use items\n` +
             `• Support businesses with plastic-free packaging\n` +
             `• Properly dispose of fishing line and gear\n` +
             `• Advocate for plastic pollution legislation\n\n` +
             `💰 **Economic Impact:**\n` +
             `• Ocean plastic causes $139 billion annual damage to marine ecosystems\n` +
             `• Cleanup costs estimated at $150+ billion globally\n` +
             `• Tourism and fishing industries severely affected`;
    }

    // Circular economy and future
    if (lowerMessage.includes('circular') || lowerMessage.includes('economy') || lowerMessage.includes('future') || lowerMessage.includes('innovation')) {
      return `🔄 **Circular Economy & Future of Plastics**\n\n` +
             `**Core Principles:**\n• ${additionalKnowledge.circularEconomy.concept.split(', ').join('\n• ')}\n\n` +
             `**Real-World Examples:**\n• ${additionalKnowledge.circularEconomy.examples.split(', ').join('\n• ')}\n\n` +
             `**Current Challenges:**\n• ${additionalKnowledge.circularEconomy.challenges.split(', ').join('\n• ')}\n\n` +
             `**Future Developments:**\n• ${additionalKnowledge.circularEconomy.future.split(', ').join('\n• ')}\n\n` +
             `🚀 **Emerging Technologies:**\n` +
             `• AI-powered waste sorting (99%+ accuracy)\n` +
             `• Plastic-eating enzymes (break down PET in hours)\n` +
             `• Chemical recycling (infinite recyclability)\n` +
             `• Blockchain tracking for plastic lifecycle\n` +
             `• 3D printing with recycled plastic filament\n\n` +
             `🏆 **Success Stories:**\n` +
             `• Netherlands: 95% plastic bottle recycling rate\n` +
             `• Patagonia: Clothing from 100% recycled plastic bottles\n` +
             `• Loop: Reusable packaging for major brands\n` +
             `• TerraCycle: Recycling "unrecyclable" materials\n\n` +
             `🎯 **2030 Targets:**\n` +
             `• 50% reduction in single-use plastics\n` +
             `• 100% recyclable packaging design\n` +
             `• 30% recycled content in new products\n` +
             `• Zero plastic waste to landfills/oceans`;
    }

    // Enhanced recycling guide
    if (lowerMessage.includes('recycle') || lowerMessage.includes('recycling') || lowerMessage.includes('how to')) {
      return `♻️ **Complete Plastic Recycling Guide 2024**\n\n` +
             `**🟢 Tier 1: Highly Recyclable (Always Accept)**\n` +
             `• Type 1 (PET) - 94% facility acceptance rate\n` +
             `• Type 2 (HDPE) - 92% facility acceptance rate\n\n` +
             `**🟡 Tier 2: Moderately Recyclable (Check Locally)**\n` +
             `• Type 4 (LDPE) - Store drop-off programs\n` +
             `• Type 5 (PP) - Growing acceptance (67% of programs)\n\n` +
             `**🔴 Tier 3: Difficult to Recycle**\n` +
             `• Type 3 (PVC) - Specialized facilities only\n` +
             `• Type 6 (PS) - Very limited programs\n` +
             `• Type 7 (Other) - Mixed materials, case-by-case\n\n` +
             `**🔬 Advanced Recycling Methods:**\n\n` +
             `**Mechanical Recycling:**\n` +
             `• Shredding → Washing → Melting → Reforming\n` +
             `• Quality decreases with each cycle\n` +
             `• Most common method (85% of recycling)\n\n` +
             `**Chemical Recycling:**\n` +
             `• Breaks plastic down to molecular level\n` +
             `• Can produce virgin-quality material\n` +
             `• Energy intensive but enables infinite recycling\n\n` +
             `**💡 Pro Tips for Maximum Impact:**\n` +
             `• Clean containers increase recycling value by 30%\n` +
             `• Remove caps (different plastic type, different process)\n` +
             `• Check RecycleCoach app for local guidelines\n` +
             `• Bundle plastic bags together for store drop-off\n` +
             `• Never recycle black plastic (sorting machines can't detect it)`;
    }

    // Enhanced preparation guide
    if (lowerMessage.includes('clean') || lowerMessage.includes('prepare') || lowerMessage.includes('wash') || lowerMessage.includes('ready')) {
      return `🧽 **Ultimate Plastic Preparation Guide**\n\n` +
             `**🎯 The "Clean Enough" Standard:**\n` +
             `• No visible food residue\n` +
             `• No strong odors\n` +
             `• Dry (moisture causes contamination)\n` +
             `• Recyclable components separated\n\n` +
             `**📋 Step-by-Step Process:**\n\n` +
             `**1. Empty Completely**\n` +
             `• Squeeze out all contents\n` +
             `• Scrape labels and stickers if loose\n` +
             `• Remove caps and pumps (different recycling stream)\n\n` +
             `**2. Rinse Effectively**\n` +
             `• Use cold water (saves energy)\n` +
             `• Add rice to bottles for scrubbing action\n` +
             `• Warm soapy water for stubborn residue\n` +
             `• Bottle brush for narrow openings\n\n` +
             `**3. Dry Thoroughly**\n` +
             `• Air dry completely\n` +
             `• Moisture causes mold in recycling bales\n` +
             `• Stack or nest similar containers\n\n` +
             `**🔬 Special Techniques by Product:**\n\n` +
             `**Peanut Butter Jars:**\n` +
             `• Scrape with rubber spatula\n` +
             `• Fill with warm water, let sit 10 minutes\n` +
             `• Add drop of dish soap, shake vigorously\n\n` +
             `**Yogurt Containers:**\n` +
             `• Peel off foil lid completely\n` +
             `• Rinse immediately after use (prevents sticking)\n` +
             `• Check if plastic lids are accepted locally\n\n` +
             `**Oil Bottles:**\n` +
             `• Add small amount of dish soap\n` +
             `• Fill with hot water, shake well\n` +
             `• May need 2-3 rinse cycles\n\n` +
             `⚠️ **Critical Don'ts:**\n` +
             `• Don't put dirty items in recycling (contaminates entire batch)\n` +
             `• Don't use harsh chemicals (residue harmful to workers)\n` +
             `• Don't over-wash (wasting water defeats environmental purpose)\n` +
             `• Don't recycle items with food still inside`;
    }

    // Scanner and identification help
    if (lowerMessage.includes('scan') || lowerMessage.includes('identify') || lowerMessage.includes('camera') || lowerMessage.includes('symbol')) {
      return `📱 **Plastic Identification Expert Guide**\n\n` +
             `**🔍 Using ReuScan Scanner:**\n\n` +
             `**Optimal Scanning Conditions:**\n` +
             `• Clean the plastic item first\n` +
             `• Ensure good lighting (natural light best)\n` +
             `• Hold camera 6-12 inches from item\n` +
             `• Include recycling symbol in frame\n` +
             `• Try multiple angles if first scan unclear\n\n` +
             `**📊 What Our AI Analyzes:**\n` +
             `• Surface texture and transparency\n` +
             `• Color and thickness patterns\n` +
             `• Recycling symbols and numbers\n` +
             `• Shape and flexibility indicators\n` +
             `• Manufacturing marks and text\n\n` +
             `**🔢 Manual Identification Methods:**\n\n` +
             `**Look for Recycling Symbol:**\n` +
             `• Triangle with number (1-7)\n` +
             `• Usually on bottom of container\n` +
             `• May be embossed or printed\n` +
             `• Sometimes accompanied by letters (PET, HDPE, etc.)\n\n` +
             `**Physical Tests (If No Symbol):**\n\n` +
             `**Flexibility Test:**\n` +
             `• Rigid + Clear = likely PET (#1)\n` +
             `• Rigid + Opaque = likely HDPE (#2)\n` +
             `• Flexible + Crinkly = likely LDPE (#4)\n\n` +
             `**Float Test:**\n` +
             `• Floats in water = PP (#5) or PE (#2/#4)\n` +
             `• Sinks = PET (#1), PVC (#3), PS (#6)\n\n` +
             `**Sound Test:**\n` +
             `• Tap with fingernail\n` +
             `• High pitch = PS (#6)\n` +
             `• Dull sound = PE (#2/#4)\n\n` +
             `**🎯 Pro Identification Tips:**\n` +
             `• Bottle caps usually PP (#5)\n` +
             `• Clear bottles usually PET (#1)\n` +
             `• Milk jugs always HDPE (#2)\n` +
             `• Foam containers always PS (#6)\n` +
             `• When in doubt, check manufacturer website`;
    }

    // Default enhanced response
    return `🤖 **I'm Your Advanced Plastic & Recycling Expert!** 🌍\n\n` +
           `I have comprehensive knowledge about plastics, recycling, and environmental science. Here's what I can help you with:\n\n` +
           `**🔬 Technical Knowledge:**\n` +
           `• Plastic chemistry and properties\n` +
           `• Manufacturing processes and innovations\n` +
           `• Recycling technologies (mechanical vs chemical)\n` +
           `• Quality degradation and contamination\n\n` +
           `**🌊 Environmental Science:**\n` +
           `• Microplastics research and health impacts\n` +
           `• Ocean pollution and marine ecosystem effects\n` +
           `• Carbon footprint of different plastic types\n` +
           `• Biodegradation timelines and conditions\n\n` +
           `**🏭 Industry Insights:**\n` +
           `• Global recycling market trends\n` +
           `• Policy developments and legislation\n` +
           `• Circular economy implementations\n` +
           `• Corporate sustainability initiatives\n\n` +
           `**🛠️ Practical Solutions:**\n` +
           `• Optimal cleaning and preparation methods\n` +
           `• Local recycling program navigation\n` +
           `• Plastic-free alternatives evaluation\n` +
           `• Waste reduction strategies\n\n` +
           `**🚀 Future Technologies:**\n` +
           `• Emerging recycling innovations\n` +
           `• Bioplastic developments\n` +
           `• AI-powered waste management\n` +
           `• Breakthrough research findings\n\n` +
           `**💬 Ask me specific questions like:**\n` +
           `• "What's the difference between biodegradable and compostable plastics?"\n` +
           `• "How does microplastic pollution affect human health?"\n` +
           `• "Which countries have the most effective plastic policies?"\n` +
           `• "What innovations are solving the plastic crisis?"\n\n` +
           `What aspect of plastics and recycling interests you most? 🤔`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    const userMessage = input;
    setInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMsg]);

    // Simulate processing time for more realistic AI feel
    setTimeout(() => {
      const aiResponse = generateAdvancedAIResponse(userMessage);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        created_at: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="h-[600px] flex flex-col shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardTitle className="flex items-center gap-3">
          <Bot className="h-7 w-7" />
          <div>
            <div className="text-lg font-bold">Advanced Plastic Expert</div>
            <div className="text-sm opacity-90">Powered by Comprehensive AI Knowledge</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <p className="text-xl font-bold mb-3 text-gray-800">🌱 Advanced Plastic Expert</p>
                <p className="mb-6 text-gray-600">Your comprehensive guide to plastics, recycling, and environmental science!</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <Recycle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold text-green-800 mb-2">Recycling Science</p>
                    <p className="text-sm text-green-700">Advanced recycling processes, contamination issues, and quality preservation</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-blue-800 mb-2">Environmental Impact</p>
                    <p className="text-sm text-blue-700">Ocean pollution, microplastics, and global sustainability solutions</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <Lightbulb className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold text-purple-800 mb-2">Future Innovations</p>
                    <p className="text-sm text-purple-700">Breakthrough technologies, bioplastics, and circular economy</p>
                  </div>
                </div>
                <p className="mt-6 text-green-600 font-medium">Ask me anything about plastics and recycling! 🚀</p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-br from-green-500 to-green-600'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-lg shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                    <div className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-green-500 to-green-600">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">Analyzing your question...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-gray-50">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about plastic types, recycling science, environmental impact, innovations..."
              disabled={isLoading}
              className="text-sm border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              className="px-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            Powered by advanced AI with comprehensive plastic and recycling knowledge
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

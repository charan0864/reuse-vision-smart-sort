
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User } from 'lucide-react';

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

  // Comprehensive plastic knowledge base
  const plasticDatabase = {
    // Plastic type 1 - PET
    pet: {
      name: 'PET (Polyethylene Terephthalate)',
      code: '1',
      recyclable: true,
      commonUses: ['Water bottles', 'Soda bottles', 'Food containers', 'Peanut butter jars', 'Salad dressing bottles'],
      recyclingProcess: 'PET is highly recyclable and can be turned into new bottles, clothing fibers, carpets, and other products.',
      preparation: 'Remove caps and labels, rinse thoroughly to remove any food residue.',
      facts: 'PET bottles can be recycled into polar fleece jackets, carpeting, and new bottles.',
      environmentalImpact: 'Recycling PET saves 60% of the energy needed to make virgin PET.'
    },
    
    // Plastic type 2 - HDPE
    hdpe: {
      name: 'HDPE (High-Density Polyethylene)',
      code: '2',
      recyclable: true,
      commonUses: ['Milk jugs', 'Laundry detergent bottles', 'Shampoo bottles', 'Butter containers', 'Cereal box liners'],
      recyclingProcess: 'HDPE is easily recyclable and widely accepted in curbside programs.',
      preparation: 'Remove caps, rinse containers, and ensure they are clean and dry.',
      facts: 'HDPE can be recycled into new bottles, plastic lumber, and park benches.',
      environmentalImpact: 'Recycling HDPE uses 88% less energy than producing new HDPE from raw materials.'
    },
    
    // Plastic type 3 - PVC
    pvc: {
      name: 'PVC (Polyvinyl Chloride)',
      code: '3',
      recyclable: false,
      commonUses: ['Pipes', 'Window frames', 'Credit cards', 'Some food packaging', 'Vinyl siding'],
      recyclingProcess: 'PVC is rarely accepted in curbside recycling due to chlorine content and processing challenges.',
      preparation: 'Check for specialized PVC recycling programs in your area.',
      facts: 'PVC contains chlorine and can release toxic chemicals when burned or processed improperly.',
      environmentalImpact: 'PVC production and disposal can release harmful chemicals into the environment.'
    },
    
    // Plastic type 4 - LDPE
    ldpe: {
      name: 'LDPE (Low-Density Polyethylene)',
      code: '4',
      recyclable: true,
      commonUses: ['Plastic bags', 'Food wraps', 'Squeezable bottles', 'Bread bags', 'Frozen food bags'],
      recyclingProcess: 'LDPE films require special collection points, not curbside pickup.',
      preparation: 'Take plastic bags and films to store drop-off locations.',
      facts: 'LDPE films can be recycled into composite lumber, trash bags, and new plastic bags.',
      environmentalImpact: 'Recycling LDPE helps reduce the billions of plastic bags that end up in landfills annually.'
    },
    
    // Plastic type 5 - PP
    pp: {
      name: 'PP (Polypropylene)',
      code: '5',
      recyclable: true,
      commonUses: ['Yogurt containers', 'Bottle caps', 'Straws', 'Medicine bottles', 'Chip bags'],
      recyclingProcess: 'PP acceptance is growing in recycling programs across the country.',
      preparation: 'Clean containers thoroughly and check local guidelines for acceptance.',
      facts: 'PP can be recycled into clothing fibers, carpets, and automotive parts.',
      environmentalImpact: 'PP recycling helps reduce landfill waste and conserves petroleum resources.'
    },
    
    // Plastic type 6 - PS
    ps: {
      name: 'PS (Polystyrene)',
      code: '6',
      recyclable: false,
      commonUses: ['Disposable cups', 'Takeout containers', 'Foam packaging', 'Egg cartons', 'Insulation'],
      recyclingProcess: 'PS is difficult to recycle and not accepted in most curbside programs.',
      preparation: 'Look for specialized polystyrene recycling programs or reduce usage.',
      facts: 'PS takes hundreds of years to decompose and often breaks into microplastics.',
      environmentalImpact: 'PS is a major contributor to ocean plastic pollution and microplastic contamination.'
    },
    
    // Plastic type 7 - Other
    other: {
      name: 'Other Plastics (Mixed)',
      code: '7',
      recyclable: false,
      commonUses: ['Some water bottles', 'Sunglasses', 'DVDs', 'Mixed plastic items', 'Complex packaging'],
      recyclingProcess: 'Type 7 plastics are mixed compositions and generally not recyclable.',
      preparation: 'Check with local facilities for specific Type 7 recycling options.',
      facts: 'Type 7 includes polycarbonate, which may contain BPA.',
      environmentalImpact: 'Mixed plastics are challenging to recycle and often end up in landfills.'
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greetings
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return "Hello! 👋 I'm your plastic recycling expert. I can help you understand different plastic types, recycling processes, and environmental impacts. What would you like to know about plastics today?";
    }

    // Specific plastic type queries
    for (const [key, plastic] of Object.entries(plasticDatabase)) {
      if (lowerMessage.includes(plastic.code) || 
          lowerMessage.includes(key) || 
          lowerMessage.includes(plastic.name.toLowerCase()) ||
          plastic.commonUses.some(use => lowerMessage.includes(use.toLowerCase()))) {
        
        return `**${plastic.name} (Type ${plastic.code})**\n\n` +
               `♻️ **Recyclable:** ${plastic.recyclable ? 'Yes' : 'No'}\n\n` +
               `📦 **Common Uses:**\n${plastic.commonUses.map(use => `• ${use}`).join('\n')}\n\n` +
               `🔄 **Recycling Info:** ${plastic.recyclingProcess}\n\n` +
               `📋 **Preparation:** ${plastic.preparation}\n\n` +
               `💡 **Fun Fact:** ${plastic.facts}\n\n` +
               `🌍 **Environmental Impact:** ${plastic.environmentalImpact}`;
      }
    }

    // General plastic recycling questions
    if (lowerMessage.includes('recycle') || lowerMessage.includes('recycling')) {
      return "♻️ **Plastic Recycling Guide**\n\n" +
             "**Highly Recyclable (Put in bin):**\n" +
             "• Type 1 (PET) - Water bottles, food containers\n" +
             "• Type 2 (HDPE) - Milk jugs, detergent bottles\n\n" +
             "**Sometimes Recyclable (Check locally):**\n" +
             "• Type 4 (LDPE) - Plastic bags (store drop-off)\n" +
             "• Type 5 (PP) - Yogurt containers, bottle caps\n\n" +
             "**Rarely Recyclable:**\n" +
             "• Type 3 (PVC) - Pipes, credit cards\n" +
             "• Type 6 (PS) - Foam containers, disposable cups\n" +
             "• Type 7 (Other) - Mixed plastics\n\n" +
             "💡 **Pro Tip:** Always check the number inside the recycling triangle!";
    }

    // Environmental impact questions
    if (lowerMessage.includes('environment') || lowerMessage.includes('impact') || lowerMessage.includes('ocean')) {
      return "🌍 **Plastic's Environmental Impact**\n\n" +
             "**The Problem:**\n" +
             "• 8 million tons of plastic enter oceans yearly\n" +
             "• Only 9% of all plastic ever made has been recycled\n" +
             "• Plastic takes 450-1000 years to decompose\n" +
             "• Microplastics are found in 90% of seabirds\n\n" +
             "**The Solution:**\n" +
             "• Recycle properly using ReuScan to identify types\n" +
             "• Reduce single-use plastic consumption\n" +
             "• Reuse containers when possible\n" +
             "• Support companies using recycled materials\n\n" +
             "🔄 **Recycling Benefits:**\n" +
             "• Saves 60% energy vs. making new plastic\n" +
             "• Reduces greenhouse gas emissions\n" +
             "• Keeps plastic out of oceans and landfills";
    }

    // Preparation and cleaning questions
    if (lowerMessage.includes('clean') || lowerMessage.includes('prepare') || lowerMessage.includes('wash')) {
      return "🧽 **How to Prepare Plastics for Recycling**\n\n" +
             "**General Steps:**\n" +
             "1. Empty all contents completely\n" +
             "2. Rinse with water to remove food residue\n" +
             "3. Remove caps and lids (recycle separately if accepted)\n" +
             "4. Remove labels if they don't come off easily during washing\n" +
             "5. Let dry before placing in recycling bin\n\n" +
             "**Special Cases:**\n" +
             "• Peanut butter jars: Scrape out residue, use warm soapy water\n" +
             "• Yogurt containers: Rinse thoroughly, check if lids are accepted\n" +
             "• Bottles with narrow necks: Use a bottle brush or add rice and shake\n\n" +
             "⚠️ **Important:** Contaminated items can ruin entire batches of recycling!";
    }

    // Plastic bags and films
    if (lowerMessage.includes('bag') || lowerMessage.includes('film') || lowerMessage.includes('wrap')) {
      return "🛍️ **Plastic Bags & Films Recycling**\n\n" +
             "**What Qualifies:**\n" +
             "• Grocery bags\n" +
             "• Bread bags\n" +
             "• Dry cleaning bags\n" +
             "• Newspaper bags\n" +
             "• Produce bags\n" +
             "• Bubble wrap\n" +
             "• Air pillows from packages\n\n" +
             "**Where to Recycle:**\n" +
             "• Grocery store drop-off bins\n" +
             "• Retail store collection points\n" +
             "• NOT in curbside recycling bins\n\n" +
             "**Preparation:**\n" +
             "• Remove receipts and stickers\n" +
             "• Make sure bags are clean and dry\n" +
             "• Bundle together in one bag\n\n" +
             "🔄 **Second Life:** Recycled into new bags, composite lumber, and outdoor furniture!";
    }

    // Microplastics questions
    if (lowerMessage.includes('micro') || lowerMessage.includes('tiny') || lowerMessage.includes('small')) {
      return "🔬 **Microplastics: The Invisible Problem**\n\n" +
             "**What are Microplastics:**\n" +
             "• Plastic pieces smaller than 5mm\n" +
             "• Come from larger plastic breaking down\n" +
             "• Released from synthetic clothing and tire wear\n" +
             "• Found in air, water, food, and our bodies\n\n" +
             "**Health Concerns:**\n" +
             "• Can carry toxic chemicals\n" +
             "• Found in human blood and organs\n" +
             "• Long-term effects still being studied\n\n" +
             "**How to Reduce:**\n" +
             "• Proper plastic recycling and disposal\n" +
             "• Choose natural fiber clothing when possible\n" +
             "• Use washing machine microfiber filters\n" +
             "• Reduce single-use plastic consumption\n" +
             "• Support plastic pollution reduction policies";
    }

    // Bioplastics and alternatives
    if (lowerMessage.includes('bio') || lowerMessage.includes('alternative') || lowerMessage.includes('replace')) {
      return "🌱 **Plastic Alternatives & Bioplastics**\n\n" +
             "**Bioplastic Types:**\n" +
             "• PLA (Polylactic Acid) - Made from corn starch\n" +
             "• PHA (Polyhydroxyalkanoates) - Produced by bacteria\n" +
             "• Starch-based plastics - From potato, corn, or cassava\n\n" +
             "**Important Notes:**\n" +
             "• Not all bioplastics are biodegradable\n" +
             "• Many require industrial composting facilities\n" +
             "• Can contaminate traditional plastic recycling\n\n" +
             "**Better Alternatives:**\n" +
             "• Glass containers for storage\n" +
             "• Stainless steel water bottles\n" +
             "• Bamboo or wooden utensils\n" +
             "• Paper bags and cardboard packaging\n" +
             "• Reusable cloth bags\n\n" +
             "💡 **Best Approach:** Reduce, reuse, then consider alternatives!";
    }

    // Scanner usage
    if (lowerMessage.includes('scan') || lowerMessage.includes('camera') || lowerMessage.includes('identify')) {
      return "📱 **Using the ReuScan Scanner**\n\n" +
             "**How to Scan:**\n" +
             "1. Go to the Scanner tab\n" +
             "2. Point camera at the plastic item\n" +
             "3. Ensure good lighting and clear view\n" +
             "4. Look for recycling symbols on the item\n" +
             "5. Tap capture to analyze\n\n" +
             "**For Best Results:**\n" +
             "• Clean the item before scanning\n" +
             "• Include any visible recycling numbers\n" +
             "• Try different angles if needed\n" +
             "• Ensure recycling symbol is visible\n\n" +
             "**What You'll Learn:**\n" +
             "• Plastic type and recycling code\n" +
             "• Whether it's recyclable in your area\n" +
             "• How to prepare it for recycling\n" +
             "• Environmental impact information";
    }

    // Default response with helpful categories
    return "🤖 **I'm here to help with plastic recycling!**\n\n" +
           "**Ask me about:**\n" +
           "♻️ Specific plastic types (1-7)\n" +
           "🔍 How to identify plastics\n" +
           "🧽 Cleaning and preparation\n" +
           "🌍 Environmental impact\n" +
           "📱 Using the scanner\n" +
           "🛍️ Plastic bags and films\n" +
           "🔬 Microplastics\n" +
           "🌱 Plastic alternatives\n\n" +
           "**Examples:**\n" +
           "• \"What is Type 1 plastic?\"\n" +
           "• \"How do I recycle yogurt containers?\"\n" +
           "• \"What's the environmental impact of plastic?\"\n" +
           "• \"Where can I recycle plastic bags?\"\n\n" +
           "What would you like to know?";
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

    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        created_at: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 800);
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
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          Plastic Recycling Expert
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <p className="text-lg font-medium mb-2">Hi! I'm your Plastic Expert 🌱</p>
                <p className="mb-4">Ask me anything about plastic recycling!</p>
                <div className="text-sm text-left max-w-md mx-auto bg-green-50 p-4 rounded-lg">
                  <p className="font-medium mb-2 text-green-800">I can help you with:</p>
                  <ul className="space-y-1 text-green-700">
                    <li>♻️ Plastic types and recycling codes</li>
                    <li>🔍 How to identify different plastics</li>
                    <li>🧽 Proper cleaning and preparation</li>
                    <li>🌍 Environmental impact facts</li>
                    <li>📱 Using the ReuScan scanner</li>
                    <li>🛍️ Plastic bags and film recycling</li>
                  </ul>
                  <p className="mt-3 text-green-600 font-medium">What would you like to learn?</p>
                </div>
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
                  className={`flex gap-2 max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-green-500">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-sm text-gray-500">Analyzing...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about plastic types, recycling, or environmental impact..."
              disabled={isLoading}
              className="text-sm"
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              className="px-3"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

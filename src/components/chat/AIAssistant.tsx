
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Bot, User, Lightbulb, AlertCircle, Recycle, Leaf, Factory, Globe } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const expertTopics = [
  {
    id: '1',
    title: 'Plastic Identification Help',
    description: 'Get help identifying unknown plastic types and recycling codes',
    icon: <AlertCircle className="h-4 w-4" />,
    color: 'bg-blue-50 border-blue-200 text-blue-800'
  },
  {
    id: '2',
    title: 'Recycling Best Practices',
    description: 'Learn optimal preparation and sorting techniques',
    icon: <Recycle className="h-4 w-4" />,
    color: 'bg-green-50 border-green-200 text-green-800'
  },
  {
    id: '3',
    title: 'Environmental Impact Assessment',
    description: 'Understand the ecological effects of different plastics',
    icon: <Leaf className="h-4 w-4" />,
    color: 'bg-emerald-50 border-emerald-200 text-emerald-800'
  },
  {
    id: '4',
    title: 'Industrial Recycling Processes',
    description: 'Deep dive into mechanical and chemical recycling',
    icon: <Factory className="h-4 w-4" />,
    color: 'bg-purple-50 border-purple-200 text-purple-800'
  },
  {
    id: '5',
    title: 'Global Recycling Policies',
    description: 'Navigate international regulations and standards',
    icon: <Globe className="h-4 w-4" />,
    color: 'bg-indigo-50 border-indigo-200 text-indigo-800'
  },
  {
    id: '6',
    title: 'Sustainable Alternatives',
    description: 'Explore eco-friendly plastic alternatives and innovations',
    icon: <Lightbulb className="h-4 w-4" />,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  }
];

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI recycling assistant. I can help you with plastic identification, recycling guidelines, environmental impact questions, and sustainability advice. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('pet') || input.includes('#1')) {
      return "PET (Polyethylene Terephthalate) #1 is highly recyclable! It's commonly used for water bottles and food containers. Clean thoroughly, remove caps and labels when possible. PET has an 85% recycling rate and can be turned into new bottles, clothing fibers, or carpeting.";
    }
    
    if (input.includes('hdpe') || input.includes('#2')) {
      return "HDPE (High-Density Polyethylene) #2 is widely recyclable with a 30% recycling rate. Found in milk jugs, detergent bottles, and toys. Rinse clean and keep caps on. HDPE is recycled into new bottles, plastic lumber, and playground equipment.";
    }
    
    if (input.includes('microplastic')) {
      return "Microplastics are plastic particles smaller than 5mm. They're found in 83% of tap water samples globally. To reduce exposure: use a water filter, avoid heating food in plastic containers, choose natural fiber clothing, and support plastic reduction initiatives.";
    }
    
    if (input.includes('biodegradable') || input.includes('compostable')) {
      return "Biodegradable plastics break down naturally but conditions matter. PLA requires industrial composting at 58°C (180-day breakdown). PHA is marine-biodegradable (6-month ocean degradation). Always check local composting facilities for acceptance.";
    }
    
    return "Thanks for your question! Based on current recycling science and environmental research, I recommend checking the plastic type first, then following local recycling guidelines. Each plastic has specific preparation requirements for optimal recycling. Would you like detailed information about a specific plastic type?";
  };

  const handleTopicClick = (topic: typeof expertTopics[0]) => {
    const topicMessage = `Tell me about ${topic.title.toLowerCase()}`;
    setInputMessage(topicMessage);
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">AI Assistant</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Get expert guidance on plastic recycling, sustainability, and environmental impact
        </p>
      </div>

      {/* Expert Consultation Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Lightbulb className="h-5 w-5 md:h-6 md:w-6" />
            Expert Consultation Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {expertTopics.map((topic) => (
              <Card 
                key={topic.id} 
                className={`cursor-pointer hover:shadow-md transition-all duration-200 ${topic.color} border-2`}
                onClick={() => handleTopicClick(topic)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {topic.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{topic.title}</h4>
                      <p className="text-xs opacity-80">{topic.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-96 md:h-[500px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5" />
            Chat with AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <ScrollArea className="flex-1 mb-4 p-4 border rounded-lg bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm">
                      {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={`rounded-lg p-3 text-sm ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-white border shadow-sm'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-white border shadow-sm rounded-lg p-3 text-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about plastic recycling, identification, or environmental impact..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '../components/Navigation';
import { GeminiService } from '../services/geminiService';
import { Clock, CheckCircle, XCircle, RotateCcw, Play, Brain } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const MockTestPage = () => {
  const { isGuest } = useAuth();
  const { toast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const topics = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'data-structures', label: 'Data Structures' },
    { value: 'algorithms', label: 'Algorithms' },
    { value: 'database', label: 'Database & SQL' },
    { value: 'system-design', label: 'System Design' },
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const mockQuestions: Record<string, Question[]> = {
    javascript: [
      {
        question: "What is the difference between 'let' and 'var' in JavaScript?",
        options: [
          "let has function scope, var has block scope",
          "let has block scope, var has function scope",
          "There is no difference",
          "let is hoisted, var is not"
        ],
        correct: 1,
        explanation: "let has block scope while var has function scope. This means let variables are only accessible within the block they are declared in."
      },
      {
        question: "Which method is used to add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0,
        explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array."
      }
    ],
    react: [
      {
        question: "What is JSX in React?",
        options: [
          "A JavaScript library",
          "A syntax extension for JavaScript",
          "A database query language",
          "A CSS framework"
        ],
        correct: 1,
        explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript files."
      }
    ]
  };

  const generateQuestionsWithAI = async () => {
    if (!selectedTopic || !selectedDifficulty) {
      toast({
        title: "Missing Selection",
        description: "Please select both topic and difficulty level.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const generatedQuestions = await GeminiService.generateMockQuestions(selectedTopic, selectedDifficulty);
      setQuestions(generatedQuestions.slice(0, 10)); // Limit to 10 questions
    } catch (error) {
      console.error('Error generating questions:', error);
      // Fallback to mock questions
      const fallbackQuestions = mockQuestions[selectedTopic] || mockQuestions.javascript;
      setQuestions(fallbackQuestions);
      toast({
        title: "Using Sample Questions",
        description: "Generated sample questions for practice.",
      });
    } finally {
      setLoading(false);
    }
  };

  const startTest = async () => {
    if (questions.length === 0) {
      await generateQuestionsWithAI();
    }
    
    if (questions.length > 0) {
      setTestStarted(true);
      setTimeLeft(questions.length * 60); // 1 minute per question
      setSelectedAnswers(new Array(questions.length).fill(-1));
      setCurrentQuestion(0);
      setShowResults(false);
    }
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishTest = () => {
    setShowResults(true);
    setTestStarted(false);
    
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index]?.correct ? 1 : 0);
    }, 0);

    toast({
      title: "Test Completed!",
      description: `You scored ${score}/${questions.length} (${Math.round((score / questions.length) * 100)}%)`,
    });
  };

  const resetTest = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTimeLeft(0);
    setTestStarted(false);
    setSelectedTopic('');
    setSelectedDifficulty('');
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index]?.correct ? 1 : 0);
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    if (testStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (testStarted && timeLeft === 0) {
      finishTest();
    }
  }, [testStarted, timeLeft]);

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Test Results</CardTitle>
              <CardDescription>Here's how you performed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-blue-600 mb-4">
                  {percentage}%
                </div>
                <div className="text-xl text-gray-600">
                  You scored {score} out of {questions.length} questions correctly
                </div>
                <Badge className={`mt-4 ${percentage >= 70 ? 'bg-green-100 text-green-800' : percentage >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {percentage >= 70 ? 'Excellent' : percentage >= 50 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <Card key={index} className="border-l-4 border-l-gray-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900">
                          Question {index + 1}: {question.question}
                        </h3>
                        {selectedAnswers[index] === question.correct ? (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                        )}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className={`p-2 rounded text-sm ${
                            optionIndex === question.correct 
                              ? 'bg-green-100 text-green-800 border border-green-300' 
                              : selectedAnswers[index] === optionIndex 
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : 'bg-gray-50'
                          }`}>
                            {option}
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button onClick={resetTest} className="flex items-center">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Take Another Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (testStarted && questions.length > 0) {
    const currentQ = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mock Test</h1>
              <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            <div className="flex items-center text-lg font-medium">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              {formatTime(timeLeft)}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{currentQ?.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQuestion]?.toString() || ""}
                onValueChange={(value) => selectAnswer(parseInt(value))}
              >
                {currentQ?.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextQuestion}
                  disabled={selectedAnswers[currentQuestion] === -1}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mock Tests</h1>
          <p className="text-gray-600 mt-2">Test your knowledge and prepare for interviews.</p>
          {isGuest && (
            <Badge variant="outline" className="mt-2">
              Viewing in Guest Mode - Limited functionality
            </Badge>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-6 w-6 mr-2 text-blue-600" />
              Create Your Mock Test
            </CardTitle>
            <CardDescription>
              Select a topic and difficulty level to generate AI-powered questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="topic" className="text-sm font-medium">
                    Select Topic
                  </Label>
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic.value} value={topic.value}>
                          {topic.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty" className="text-sm font-medium">
                    Difficulty Level
                  </Label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty.value} value={difficulty.value}>
                          {difficulty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={startTest}
                  disabled={isGuest || !selectedTopic || !selectedDifficulty || loading}
                  size="lg"
                  className="flex items-center"
                >
                  <Play className="h-5 w-5 mr-2" />
                  {loading ? 'Generating Questions...' : isGuest ? 'Login to Start Test' : 'Start Mock Test'}
                </Button>
              </div>

              {selectedTopic && selectedDifficulty && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Test Details:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Topic: {topics.find(t => t.value === selectedTopic)?.label}</li>
                    <li>• Difficulty: {difficulties.find(d => d.value === selectedDifficulty)?.label}</li>
                    <li>• Questions: 10 AI-generated questions</li>
                    <li>• Time Limit: 10 minutes</li>
                    <li>• Scoring: Immediate results with explanations</li>
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { topic: 'JavaScript', score: 8, total: 10, date: '2024-01-20' },
                { topic: 'React.js', score: 7, total: 10, date: '2024-01-18' },
                { topic: 'Python', score: 9, total: 10, date: '2024-01-15' },
              ].map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{result.topic}</h3>
                    <p className="text-sm text-gray-500">Taken on {result.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {Math.round((result.score / result.total) * 100)}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {result.score}/{result.total}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MockTestPage;

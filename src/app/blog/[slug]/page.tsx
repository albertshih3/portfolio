"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Calendar, 
  Clock, 
  Tag, 
  ArrowLeft,
  Share2,
  BookOpen,
  ChevronRight
} from "lucide-react";
import Sidebar from "@/components/sidebar/sidebar";
import ContactModal from "@/components/contact/contact-modal";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

// This would typically come from a CMS or database
const blogPosts = [
  {
    id: "building-scalable-web-apps",
    title: "Building Scalable Web Applications with React and Firebase",
    excerpt: "Learn how to architect and build web applications that can scale from hundreds to millions of users using React, Firebase, and modern development practices.",
    content: `In this comprehensive guide, we'll explore the fundamental principles of building scalable web applications using React and Firebase. As applications grow, the challenges of maintaining performance, managing state, and ensuring reliability become increasingly complex.

## The Foundation: Architecture Decisions

When building for scale, your architectural decisions made early on will significantly impact your application's ability to grow. Here are the key considerations:

### Component Architecture
- **Atomic Design**: Structure your components using atomic design principles
- **State Management**: Choose between Context API, Redux, or Zustand based on complexity
- **Code Splitting**: Implement lazy loading and dynamic imports for better performance

### Firebase Integration
Firebase provides a robust backend-as-a-service that scales automatically:

- **Firestore**: NoSQL database with real-time capabilities
- **Authentication**: Built-in user management and security
- **Cloud Functions**: Serverless backend logic
- **Hosting**: Global CDN for fast content delivery

## Performance Optimization Strategies

1. **Component Memoization**: Use React.memo and useMemo to prevent unnecessary re-renders
2. **Virtual Scrolling**: Implement for large lists and datasets
3. **Image Optimization**: Use Next.js Image component with proper sizing
4. **Database Indexing**: Optimize Firestore queries with proper indexing

## Real-World Implementation

In my recent project, the Oakland Zoo Empathy Guide, I implemented these principles to create an application that manages 50+ real-time animal profiles with associated media. The key was designing a scalable data structure and implementing intelligent caching strategies.

The application needed to work in areas with poor connectivity, so I implemented offline-first architecture with service workers and local storage fallbacks.

## Conclusion

Building scalable applications requires thinking beyond the immediate requirements. By establishing solid architectural foundations, implementing proper state management, and leveraging cloud services like Firebase, you can create applications that grow with your users' needs.`,
    date: "2024-12-15",
    readTime: "8 min read",
    tags: ["React", "Firebase", "Web Development", "Scalability"],
    featured: true
  },
  {
    id: "ai-integration-practical-guide",
    title: "AI Integration in Web Applications: A Practical Guide",
    excerpt: "Discover how to integrate AI capabilities into your web applications using modern LLMs, APIs, and best practices for creating intelligent user experiences.",
    content: `Artificial Intelligence is transforming how we build and interact with web applications. In this guide, I'll share practical approaches to integrating AI capabilities based on my experience building the x10e Health Monitoring System.

## Understanding AI Integration Options

There are several approaches to adding AI to your applications:

### 1. API-Based Integration
- **AWS Bedrock**: Managed LLM service with multiple model options
- **OpenAI API**: GPT models for text generation and analysis
- **Google VertexAI**: Enterprise-grade AI platform
- **Anthropic Claude**: Advanced reasoning capabilities

### 2. Client-Side AI
- **TensorFlow.js**: Run models directly in the browser
- **ONNX.js**: Cross-platform model inference
- **WebGL acceleration**: Leverage GPU for better performance

## Practical Implementation Example

In the x10e Health Monitoring System, I integrated AWS Bedrock to provide personalized health insights:

\`\`\`typescript
// Health data analysis with AWS Bedrock
const analyzeHealthData = async (biomarkerData: BiomarkerData) => {
  const prompt = \`
    Analyze the following health biomarkers and provide insights:
    \${JSON.stringify(biomarkerData)}
    
    Focus on trends, patterns, and actionable recommendations.
  \`;
  
  const response = await bedrock.invokeModel({
    modelId: 'anthropic.claude-v2',
    body: JSON.stringify({
      prompt,
      max_tokens: 1000,
      temperature: 0.3
    })
  });
  
  return JSON.parse(response.body);
};
\`\`\`

## Best Practices for AI Integration

### 1. User Experience Design
- **Progressive Enhancement**: Ensure your app works without AI
- **Loading States**: Provide clear feedback during AI processing
- **Fallback Mechanisms**: Handle API failures gracefully
- **Transparent AI**: Let users know when they're interacting with AI

### 2. Performance Considerations
- **Caching**: Store AI responses for repeated queries
- **Streaming**: Use streaming APIs for real-time responses
- **Rate Limiting**: Implement proper request throttling
- **Cost Management**: Monitor API usage and implement budgets

### 3. Security and Privacy
- **Data Sanitization**: Clean user inputs before sending to AI
- **PII Protection**: Avoid sending sensitive data to external APIs
- **Access Control**: Implement proper authentication and authorization
- **Audit Trails**: Log AI interactions for debugging and compliance

## Future Considerations

The AI landscape is rapidly evolving. Keep these trends in mind:

- **Edge AI**: Running models locally for better privacy and performance
- **Multimodal AI**: Combining text, image, and audio processing
- **Agent-Based Systems**: AI that can take actions on behalf of users
- **Fine-Tuning**: Customizing models for specific use cases

By following these practices and staying current with AI developments, you can create applications that truly enhance user experiences through intelligent features.`,
    date: "2024-12-10",
    readTime: "12 min read",
    tags: ["AI", "Machine Learning", "AWS", "Integration"],
    featured: true
  },
  {
    id: "mobile-app-development-react-native",
    title: "Mobile App Development with React Native: Lessons Learned",
    excerpt: "Key insights and best practices from developing cross-platform mobile applications, including offline functionality and performance optimization.",
    content: `Developing mobile applications presents unique challenges compared to web development. Through building the Empathy Guide Mobile App for Oakland Zoo, I've learned valuable lessons about creating robust, user-friendly mobile experiences.

## React Native: The Right Choice?

React Native offers compelling advantages for cross-platform development:

### Pros:
- **Code Reuse**: Share business logic between iOS and Android
- **Faster Development**: Single codebase reduces development time
- **Hot Reloading**: Rapid iteration during development
- **Native Performance**: Direct access to native APIs

### Cons:
- **Platform Differences**: Some features require platform-specific code
- **Third-Party Dependencies**: Potential compatibility issues
- **Debugging Complexity**: More complex than single-platform development

## Offline-First Architecture

One of the biggest challenges in mobile development is handling unreliable network connections. For the zoo app, staff needed access to animal data even in areas with poor connectivity.

### Implementation Strategy:

\`\`\`typescript
// Offline data synchronization
class OfflineDataManager {
  private localDB: SQLite.Database;
  private syncQueue: SyncOperation[] = [];
  
  async syncData() {
    if (await this.isOnline()) {
      // Sync pending operations
      await this.processSyncQueue();
      
      // Download latest data
      await this.downloadUpdates();
    }
  }
  
  async saveAnimalData(data: AnimalData) {
    // Save locally first
    await this.localDB.insert('animals', data);
    
    // Queue for sync when online
    this.syncQueue.push({
      type: 'UPDATE',
      table: 'animals',
      data
    });
  }
}
\`\`\`

## Performance Optimization Techniques

### 1. Image Optimization
- **Lazy Loading**: Load images as they come into view
- **Caching**: Implement proper image caching strategies
- **Compression**: Optimize images for mobile bandwidth
- **Progressive Loading**: Show low-quality previews first

### 2. Memory Management
- **Component Cleanup**: Properly unmount components and clear timers
- **Image Cleanup**: Release image memory when not needed
- **State Optimization**: Avoid storing large objects in component state

### 3. Navigation Performance
- **Lazy Screens**: Load screens only when needed
- **Gesture Handling**: Use native gesture handlers for smooth interactions
- **Animation Optimization**: Use native driver for animations

## Firebase Integration Best Practices

Firebase provides excellent mobile SDKs, but requires careful configuration:

### Firestore Optimization:
\`\`\`typescript
// Efficient querying with proper indexing
const getAnimalsByZone = (zoneId: string) => {
  return firestore()
    .collection('animals')
    .where('zoneId', '==', zoneId)
    .where('active', '==', true)
    .orderBy('name')
    .limit(20)
    .get();
};

// Offline persistence
firestore().settings({
  persistence: true,
  cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED
});
\`\`\`

## Testing Strategies

Mobile app testing requires a multi-faceted approach:

### 1. Unit Testing
- **Business Logic**: Test core functionality independently
- **Utilities**: Verify helper functions and data transformations
- **API Integration**: Mock external services for consistent testing

### 2. Integration Testing
- **Navigation**: Test screen transitions and deep linking
- **Data Flow**: Verify data persistence and synchronization
- **Error Handling**: Test offline scenarios and error recovery

### 3. Device Testing
- **Multiple Devices**: Test on various screen sizes and OS versions
- **Performance Testing**: Monitor memory usage and battery impact
- **Network Conditions**: Test with poor connectivity and offline scenarios

## Deployment and Distribution

### App Store Guidelines:
- **Privacy Policies**: Clearly document data collection and usage
- **Permissions**: Request only necessary permissions
- **Performance Standards**: Meet platform performance requirements
- **Content Guidelines**: Ensure compliance with app store policies

The mobile development landscape continues to evolve rapidly. Stay current with platform updates, new React Native features, and emerging best practices to create applications that users love and rely on.`,
    date: "2024-12-05",
    readTime: "10 min read",
    tags: ["React Native", "Mobile Development", "Offline", "Performance"],
    featured: false
  },
  {
    id: "leadership-lessons-tech-teams",
    title: "Leadership Lessons from Managing Student Tech Teams",
    excerpt: "Insights on team leadership, mentorship, and project management gained from supervising student employees in IT initiatives at UC Merced.",
    content: `Leading technical teams, especially as a student supervisor, presents unique challenges and opportunities. Over the past two years at UC Merced's Office of Information Technology, I've learned valuable lessons about team leadership, mentorship, and project management.

## Building Trust and Credibility

As a peer leader, establishing credibility requires demonstrating both technical competence and emotional intelligence:

### Technical Leadership:
- **Lead by Example**: Be hands-on with challenging technical problems
- **Knowledge Sharing**: Document processes and share learning resources
- **Code Reviews**: Provide constructive feedback that helps team members grow
- **Problem Solving**: Guide the team through complex technical decisions

### People Leadership:
- **Active Listening**: Understand individual motivations and challenges
- **Clear Communication**: Set expectations and provide regular feedback
- **Recognition**: Celebrate both individual and team achievements
- **Support**: Advocate for team members' professional development

## Mentorship in Technical Environments

Mentoring fellow students requires adapting to different learning styles and experience levels:

### Effective Mentorship Strategies:

1. **Pair Programming**: Work together on complex problems
2. **Code Walkthroughs**: Explain architectural decisions and trade-offs
3. **Project Ownership**: Give team members ownership of specific features
4. **Regular Check-ins**: Provide consistent feedback and support

### Real Example:
When onboarding new team members to our mobile app development project, I implemented a structured learning path:

\`\`\`
Week 1: Environment setup and React Native basics
Week 2: Firebase integration and authentication
Week 3: State management and data flow
Week 4: First feature implementation with guidance
Week 5+: Independent feature development with code reviews
\`\`\`

## Project Management Lessons

Managing multiple IT initiatives taught me the importance of structured project management:

### Key Principles:
- **Clear Scope Definition**: Document requirements and success criteria
- **Regular Communication**: Weekly team meetings and progress updates
- **Risk Management**: Identify potential blockers early
- **Iterative Development**: Break large projects into manageable sprints

### Tools and Processes:
- **Git Workflow**: Implement branching strategies for collaboration
- **Documentation**: Maintain wikis and technical documentation
- **Testing Standards**: Establish quality gates and review processes
- **Deployment Pipelines**: Automate testing and deployment processes

## Handling Challenges

Leading peers comes with unique challenges:

### Common Issues and Solutions:

**Challenge**: Team members struggling with imposter syndrome
**Solution**: Create psychological safety through open communication about challenges and failures

**Challenge**: Balancing academic workload with project deadlines
**Solution**: Flexible scheduling and understanding of academic priorities

**Challenge**: Technical disagreements within the team
**Solution**: Structured decision-making processes and documentation of trade-offs

**Challenge**: Maintaining motivation during long-term projects
**Solution**: Regular milestone celebrations and connecting work to larger impact

## Measuring Success

Success in student team leadership goes beyond project delivery:

### Metrics I Track:
- **Team Member Growth**: Skills developed and confidence gained
- **Project Quality**: Code quality, user satisfaction, and technical debt
- **Team Retention**: How many team members return for subsequent terms
- **Knowledge Transfer**: Documentation quality and process improvement

## The Impact of Student Leadership

Student leadership creates a multiplier effect:

- **Peer Learning**: Students often learn better from peers
- **Diverse Perspectives**: Student leaders bring fresh approaches to problems
- **Future Leaders**: Developing leadership skills early in careers
- **Institutional Knowledge**: Creating continuity in student organizations

## Key Takeaways

1. **Authenticity Matters**: Be genuine in your interactions and admit when you don't know something
2. **Invest in People**: The time spent mentoring pays dividends in team performance
3. **Embrace Failure**: Use mistakes as learning opportunities for the entire team
4. **Stay Connected**: Maintain relationships beyond project timelines
5. **Document Everything**: Create resources that benefit future team members

Leading student tech teams has been one of the most rewarding aspects of my university experience. The skills developed—technical communication, project management, and people leadership—are invaluable for any technical career path.

The intersection of technical expertise and people skills creates opportunities to make lasting impact, both on the projects we build and the people we work with.`,
    date: "2024-11-28",
    readTime: "9 min read",
    tags: ["Leadership", "Management", "Teams", "Mentorship"],
    featured: false
  },
  {
    id: "computer-vision-opencv-projects",
    title: "Getting Started with Computer Vision: OpenCV Projects for Beginners",
    excerpt: "A beginner-friendly introduction to computer vision concepts and practical OpenCV projects to build your skills in image processing and object detection.",
    content: `Computer vision is one of the most exciting and accessible areas of artificial intelligence. Through my coursework and projects, I've discovered that the best way to learn computer vision is through hands-on projects. Here's a comprehensive guide to getting started.

## What is Computer Vision?

Computer vision enables machines to interpret and understand visual information from the world. It combines techniques from mathematics, computer science, and domain expertise to extract meaningful information from images and videos.

### Key Applications:
- **Object Detection**: Identifying and locating objects in images
- **Face Recognition**: Identifying individuals from facial features
- **Medical Imaging**: Analyzing X-rays, MRIs, and other medical images
- **Autonomous Vehicles**: Processing camera feeds for navigation
- **Quality Control**: Inspecting products in manufacturing

## Setting Up Your Environment

Before diving into projects, let's set up a proper development environment:

### Required Libraries:
\`\`\`bash
# Install OpenCV and supporting libraries
pip install opencv-python
pip install numpy
pip install matplotlib
pip install jupyter

# For advanced features
pip install opencv-contrib-python
\`\`\`

### Basic Setup:
\`\`\`python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Test your installation
print(f"OpenCV version: {cv2.__version__}")
\`\`\`

## Project 1: Image Filtering and Enhancement

Start with basic image processing to understand fundamental concepts:

\`\`\`python
def enhance_image(image_path):
    # Load the image
    img = cv2.imread(image_path)
    
    # Convert to different color spaces
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Apply filters
    blurred = cv2.GaussianBlur(img, (15, 15), 0)
    sharpened = cv2.filter2D(img, -1, np.array([[-1,-1,-1],
                                               [-1, 9,-1],
                                               [-1,-1,-1]]))
    
    # Edge detection
    edges = cv2.Canny(gray, 100, 200)
    
    return {
        'original': img,
        'blurred': blurred,
        'sharpened': sharpened,
        'edges': edges
    }
\`\`\`

## Project 2: Color-Based Object Detection

Learn to detect objects based on color properties:

\`\`\`python
def detect_colored_objects(image, lower_color, upper_color):
    # Convert to HSV color space
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    # Create mask for the specified color range
    mask = cv2.inRange(hsv, lower_color, upper_color)
    
    # Find contours
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Draw bounding boxes around detected objects
    result = image.copy()
    for contour in contours:
        if cv2.contourArea(contour) > 500:  # Filter small objects
            x, y, w, h = cv2.boundingRect(contour)
            cv2.rectangle(result, (x, y), (x+w, y+h), (0, 255, 0), 2)
    
    return result, mask
\`\`\`

## Project 3: Face Detection with Haar Cascades

Implement face detection using pre-trained classifiers:

\`\`\`python
def detect_faces(image_path):
    # Load the face cascade classifier
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    # Load and process the image
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Detect faces
    faces = face_cascade.detectMultiScale(
        gray, 
        scaleFactor=1.1, 
        minNeighbors=5, 
        minSize=(30, 30)
    )
    
    # Draw rectangles around faces
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
    
    return img, len(faces)
\`\`\`

## Project 4: Motion Detection

Build a simple motion detection system:

\`\`\`python
class MotionDetector:
    def __init__(self):
        self.background = None
        
    def detect_motion(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, (21, 21), 0)
        
        # Initialize background
        if self.background is None:
            self.background = gray
            return frame, False
        
        # Compute difference
        diff = cv2.absdiff(self.background, gray)
        threshold = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)[1]
        
        # Find contours
        contours, _ = cv2.findContours(threshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        motion_detected = False
        for contour in contours:
            if cv2.contourArea(contour) > 1000:
                motion_detected = True
                x, y, w, h = cv2.boundingRect(contour)
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
        
        # Update background
        self.background = cv2.addWeighted(self.background, 0.9, gray, 0.1, 0)
        
        return frame, motion_detected
\`\`\`

## Best Practices and Tips

### Performance Optimization:
1. **Resize Images**: Work with smaller images when possible
2. **ROI Processing**: Process only regions of interest
3. **Efficient Algorithms**: Choose appropriate algorithms for your use case
4. **Memory Management**: Clean up resources properly

### Debugging Techniques:
1. **Visualize Intermediate Steps**: Display processed images at each stage
2. **Parameter Tuning**: Experiment with different parameters
3. **Test with Various Images**: Use diverse test cases
4. **Logging**: Track processing times and results

### Real-World Considerations:
- **Lighting Conditions**: Test under different lighting scenarios
- **Camera Quality**: Account for varying image quality
- **Processing Speed**: Balance accuracy with real-time requirements
- **Error Handling**: Implement robust error handling

## Next Steps

Once comfortable with these basics, explore advanced topics:

- **Deep Learning**: TensorFlow and PyTorch for computer vision
- **Object Tracking**: Following objects across video frames
- **3D Vision**: Stereo vision and depth estimation
- **Medical Imaging**: Specialized techniques for medical applications

Computer vision opens doors to countless applications. Start with these foundational projects, experiment with your own ideas, and gradually tackle more complex challenges. The key is consistent practice and staying curious about new techniques and applications.`,
    date: "2024-11-20",
    readTime: "11 min read",
    tags: ["Computer Vision", "OpenCV", "Python", "Tutorial"],
    featured: false
  }
];

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPost({ params }: BlogPostPageProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null);
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    // Resolve the params promise and set the slug
    params.then(({ slug: resolvedSlug }) => {
      setSlug(resolvedSlug);
    });
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    
    const foundPost = blogPosts.find(p => p.id === slug);
    if (foundPost) {
      setPost(foundPost);
      // Track blog post view
      if (analytics) {
        logEvent(analytics, 'blog_post_view', {
          post_id: foundPost.id,
          post_title: foundPost.title
        });
      }
    }
  }, [slug]);

  const handleContactClick = (source: string) => {
    if (analytics) {
      logEvent(analytics, 'contact_button_click', {
        button_source: source,
        page: 'blog_post',
        post_id: post?.id
      });
    }
    setIsContactModalOpen(true);
  };

  const handleShare = () => {
    if (analytics) {
      logEvent(analytics, 'blog_post_share', {
        post_id: post?.id,
        post_title: post?.title
      });
    }
    
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (!post) {
    return notFound();
  }

  // Get other posts for recommendations
  const otherPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar onContactClick={() => handleContactClick('sidebar')} />
      
      <main className="lg:ml-72">
        <div className="p-8 max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                >
                  <Tag size={14} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  {post.readTime}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {post.excerpt}
            </p>
          </motion.header>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-16"
          >
            <div 
              className="prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800"
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(/\n/g, '<br>').replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>') 
              }}
            />
          </motion.article>

          {/* Author CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white mb-16"
          >
            <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
            <p className="text-lg mb-6 opacity-90">
              I&apos;d love to hear your thoughts or discuss how we can work together 
              on similar projects and challenges.
            </p>
            <button
              onClick={() => handleContactClick('blog_post_cta')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get In Touch
            </button>
          </motion.section>

          {/* Related Posts */}
          {otherPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                <BookOpen size={24} className="text-blue-600" />
                More Articles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <Link href={`/blog/${relatedPost.id}`} className="block">
                      <div className="p-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {relatedPost.readTime}
                          </span>
                          <ChevronRight size={16} className="text-blue-600" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
# React TypeScript Course Curriculum
## For New Developers

---

## Course Overview

This curriculum is designed for developers who have basic JavaScript knowledge and want to learn React with TypeScript. The course emphasizes practical, hands-on learning with projects that reinforce each concept.

**Prerequisites:**
- Basic JavaScript (ES6+)
- HTML & CSS fundamentals
- Basic understanding of the command line
- Text editor or IDE installed

**Course Duration:** 8-10 weeks (assuming 10-15 hours/week)

---

## Module 1: TypeScript Fundamentals (Week 1)

### Lesson 1.1: Introduction to TypeScript
- What is TypeScript and why use it?
- TypeScript vs JavaScript
- Setting up the TypeScript development environment
- The TypeScript compiler (tsc)
- tsconfig.json configuration basics

**Practice:** Install TypeScript and compile your first .ts file

### Lesson 1.2: Basic Types
- Primitive types: string, number, boolean
- Arrays and tuples
- Any, unknown, never, and void
- Type inference
- Union types

**Practice:** Create typed variables and functions

### Lesson 1.3: Interfaces and Type Aliases
- Defining interfaces
- Optional and readonly properties
- Type aliases vs interfaces
- Extending interfaces
- Index signatures

**Practice:** Model real-world data structures (User, Product, etc.)

### Lesson 1.4: Functions in TypeScript
- Function type annotations
- Optional and default parameters
- Rest parameters
- Function overloads
- Arrow functions with types

**Practice:** Build a typed utility functions library

### Lesson 1.5: Advanced Types
- Generics basics
- Utility types (Partial, Pick, Omit, Record)
- Type guards and narrowing
- Literal types
- Discriminated unions

**Mini-Project:** Build a typed task manager (console-based)

---

## Module 2: React Basics (Week 2)

### Lesson 2.1: Introduction to React
- What is React and why use it?
- Component-based architecture
- Virtual DOM concepts
- Setting up a React project with Vite + TypeScript
- Project structure overview

**Practice:** Create your first React + TypeScript project

### Lesson 2.2: JSX and TSX
- JSX syntax and rules
- TypeScript in JSX (TSX)
- Expressions in JSX
- Conditional rendering
- Lists and keys
- Fragments

**Practice:** Build static components with various JSX patterns

### Lesson 2.3: Components and Props
- Functional components
- Props and typing props with interfaces
- Props.children and ReactNode
- Default props
- Props destructuring
- Component composition

**Practice:** Create a reusable Card component system

### Lesson 2.4: Styling in React
- Inline styles with TypeScript
- CSS Modules
- CSS-in-JS basics (styled-components)
- Tailwind CSS with React
- Style organization strategies

**Practice:** Style your Card components multiple ways

### Lesson 2.5: Events in React
- Event handling basics
- Typing event handlers
- Common events (onClick, onChange, onSubmit)
- Event object types
- Synthetic events in React
- Preventing default behavior

**Practice:** Build an interactive form with validation

**Module Project:** Personal portfolio landing page with multiple components

---

## Module 3: State and Interactivity (Week 3)

### Lesson 3.1: useState Hook
- Introduction to React Hooks
- useState basics
- Typing state with TypeScript
- Updating state correctly
- State with objects and arrays
- Functional updates

**Practice:** Build a counter and a form with controlled inputs

### Lesson 3.2: State Management Patterns
- Lifting state up
- Prop drilling and its problems
- State colocation
- Derived state
- State initialization strategies

**Practice:** Create a todo list with shared state

### Lesson 3.3: Forms in React
- Controlled vs uncontrolled components
- Form input types
- Multiple inputs
- Form validation
- Type-safe form handling
- Form submission

**Practice:** Build a multi-step registration form

### Lesson 3.4: Lists and Keys
- Rendering lists
- Key prop importance
- Array methods (map, filter, reduce)
- CRUD operations on lists
- Typing arrays properly
- List performance considerations

**Practice:** Enhance todo list with filtering and sorting

### Lesson 3.5: Conditional Rendering Patterns
- If/else in JSX
- Ternary operators
- Logical && operator
- Switch statements
- Early returns
- Render props pattern

**Practice:** Build a dashboard with conditional sections

**Module Project:** Full-featured todo application with categories and filtering

---

## Module 4: Side Effects and Data Fetching (Week 4)

### Lesson 4.1: useEffect Hook
- Understanding side effects
- useEffect basics
- Dependency arrays
- Cleanup functions
- Effect execution timing
- Common useEffect patterns

**Practice:** Build a document title updater and timer

### Lesson 4.2: Data Fetching Basics
- Fetch API overview
- Async/await in effects
- Loading states
- Error handling
- Typing API responses
- Axios introduction

**Practice:** Fetch and display data from a public API

### Lesson 4.3: Custom Hooks
- What are custom hooks?
- Creating reusable hooks
- Typing custom hooks
- useFetch hook pattern
- useLocalStorage hook
- Hook composition

**Practice:** Build reusable data fetching hooks

### Lesson 4.4: Advanced Data Fetching
- Handling race conditions
- Debouncing and throttling
- Pagination
- Infinite scroll
- Caching strategies
- Introduction to React Query

**Practice:** Build a searchable, paginated list

### Lesson 4.5: Working with APIs
- RESTful API patterns
- CRUD operations
- Authentication basics
- Error handling strategies
- API response typing
- Environment variables

**Practice:** Create a complete API integration layer

**Module Project:** Weather dashboard with city search and forecasts

---

## Module 5: Advanced Hooks and Patterns (Week 5)

### Lesson 5.1: useReducer Hook
- When to use useReducer
- Reducer pattern basics
- Actions and action types
- Typing reducers properly
- useReducer vs useState
- Complex state logic

**Practice:** Refactor todo app to use useReducer

### Lesson 5.2: useContext Hook
- Props drilling problem
- Context API basics
- Creating and providing context
- Consuming context
- Typing context properly
- Context best practices

**Practice:** Create a theme context for dark/light mode

### Lesson 5.3: useRef Hook
- Understanding refs
- Accessing DOM elements
- Typing refs correctly
- useRef vs useState
- Storing mutable values
- Forwarding refs

**Practice:** Build focus management and animation triggers

### Lesson 5.4: useMemo and useCallback
- Performance optimization
- Memoization concepts
- When to use useMemo
- When to use useCallback
- Typing memoized values
- Performance profiling

**Practice:** Optimize a computationally expensive component

### Lesson 5.5: Compound Components Pattern
- Component composition
- Implicit state sharing
- Context with compound components
- Real-world examples
- Typing compound components
- Flexibility vs complexity

**Practice:** Build a flexible accordion component

**Module Project:** E-commerce product catalog with cart (using Context + useReducer)

---

## Module 6: Routing and Navigation (Week 6)

### Lesson 6.1: React Router Basics
- Single Page Applications (SPAs)
- Installing React Router
- BrowserRouter and Routes
- Route component
- Link and NavLink
- Typing route params

**Practice:** Set up basic routing for multiple pages

### Lesson 6.2: Advanced Routing
- Nested routes
- Dynamic routes and params
- useParams hook
- useNavigate hook
- useLocation hook
- Programmatic navigation

**Practice:** Build a blog with post detail pages

### Lesson 6.3: Route Protection and Loading
- Protected routes
- Redirect patterns
- Lazy loading routes
- Suspense for code splitting
- Loading states
- Error boundaries with routing

**Practice:** Add authentication routing logic

### Lesson 6.4: Search and Query Parameters
- useSearchParams hook
- Query string management
- Filters and search
- URL state management
- Typing search params
- Navigation with state

**Practice:** Add search and filtering with URL params

### Lesson 6.5: Layout Routes
- Shared layouts
- Outlet component
- Persistent UI elements
- Layout nesting
- Navigation menus
- Breadcrumbs

**Practice:** Create a multi-layout application structure

**Module Project:** Multi-page blog application with routing, categories, and search

---

## Module 7: Forms and Validation (Week 7)

### Lesson 7.1: Complex Form Handling
- Form state management
- Validation strategies
- Error messaging
- Field arrays
- Dynamic forms
- Form performance

**Practice:** Build a job application form

### Lesson 7.2: React Hook Form
- Installing React Hook Form
- useForm hook
- Register inputs
- Form validation
- Error handling
- Typing with React Hook Form

**Practice:** Refactor forms to use React Hook Form

### Lesson 7.3: Form Validation with Zod
- Schema validation
- Zod basics
- Integration with React Hook Form
- Custom validation rules
- Typed form data
- Error messages

**Practice:** Add comprehensive validation to forms

### Lesson 7.4: File Uploads
- File input handling
- Preview images
- Upload progress
- Drag and drop
- Multiple files
- File type validation

**Practice:** Build an image upload component

### Lesson 7.5: Advanced Form Patterns
- Multi-step forms
- Conditional fields
- Form wizards
- Auto-save
- Field dependencies
- Accessibility in forms

**Practice:** Create a multi-step checkout form

**Module Project:** Complete user registration system with validation and file uploads

---

## Module 8: State Management and Architecture (Week 8)

### Lesson 8.1: State Management Overview
- Local vs global state
- When to use different solutions
- State management libraries overview
- Architecture patterns
- Selecting the right tool

**Practice:** Audit existing projects for state management needs

### Lesson 8.2: Zustand Basics
- Installing Zustand
- Creating stores
- Using stores in components
- Typing stores
- Computed values
- Middleware

**Practice:** Migrate context state to Zustand

### Lesson 8.3: Redux Toolkit (RTK)
- Redux concepts review
- RTK setup
- Creating slices
- Async actions with createAsyncThunk
- Typing Redux with TypeScript
- RTK Query basics

**Practice:** Build a feature with Redux Toolkit

### Lesson 8.4: React Query (TanStack Query)
- Server state vs client state
- Query basics
- Mutations
- Cache management
- Optimistic updates
- Typing queries and mutations

**Practice:** Implement data fetching with React Query

### Lesson 8.5: Architecture Best Practices
- Feature-based folder structure
- Component organization
- Separating concerns
- Custom hooks for logic
- Service layers
- Testing considerations

**Practice:** Refactor a project with better architecture

**Module Project:** Social media feed with posts, comments, and user interactions

---

## Module 9: Testing React Applications (Week 9)

### Lesson 9.1: Testing Fundamentals
- Why test?
- Types of tests
- Testing pyramid
- Jest basics
- Test structure (AAA pattern)
- Writing your first test

**Practice:** Write unit tests for utility functions

### Lesson 9.2: React Testing Library
- Testing Library philosophy
- Rendering components
- Queries (getBy, findBy, queryBy)
- User interactions
- Async testing
- Typing tests

**Practice:** Test basic components

### Lesson 9.3: Testing User Interactions
- fireEvent vs userEvent
- Form testing
- Button clicks
- Input changes
- Testing hooks
- Custom render functions

**Practice:** Test the todo application

### Lesson 9.4: Testing Async Code
- Waitfor and findBy
- Mocking API calls
- MSW (Mock Service Worker)
- Testing loading states
- Testing error states
- Async hooks testing

**Practice:** Test data fetching components

### Lesson 9.5: Integration and E2E Testing
- Component integration tests
- Testing routing
- Testing state management
- Playwright/Cypress introduction
- E2E test structure
- CI/CD considerations

**Practice:** Write integration tests for a feature

**Module Project:** Add comprehensive test coverage to e-commerce project

---

## Module 10: Advanced Topics and Deployment (Week 10)

### Lesson 10.1: Performance Optimization
- React DevTools Profiler
- Identifying bottlenecks
- Code splitting strategies
- Bundle size optimization
- Image optimization
- Web Vitals

**Practice:** Optimize a slow application

### Lesson 10.2: TypeScript Advanced Patterns
- Generics in React
- Discriminated unions
- Type guards
- Utility types for components
- Conditional types
- Template literal types

**Practice:** Refactor components with advanced types

### Lesson 10.3: Accessibility (a11y)
- ARIA attributes
- Semantic HTML
- Keyboard navigation
- Screen reader testing
- Focus management
- WCAG guidelines

**Practice:** Audit and fix accessibility issues

### Lesson 10.4: Build and Deployment
- Production builds
- Environment variables
- Deployment platforms (Vercel, Netlify)
- CI/CD basics
- Domain setup
- Performance monitoring

**Practice:** Deploy a project to production

### Lesson 10.5: Next Steps and Advanced Topics
- Next.js introduction
- Server components
- Streaming and Suspense
- Animation libraries
- Component libraries
- Career guidance

**Practice:** Explore Next.js basics

**Capstone Project:** Full-stack blog platform with authentication, CRUD operations, and deployment

---

## Capstone Project: Full-Stack Blog Platform

**Requirements:**
- User authentication (login/signup)
- Create, read, update, delete blog posts
- Rich text editor
- Comment system
- User profiles
- Search and filtering
- Responsive design
- Comprehensive testing
- Production deployment

**Technologies:**
- React + TypeScript
- React Router
- React Hook Form + Zod
- React Query or Redux Toolkit
- Styled Components or Tailwind
- Testing Library + Jest
- Backend API (provided or build your own)

**Timeline:** 2-3 weeks

---

## Additional Resources

### Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Practice Platforms
- Frontend Mentor
- CodePen
- CodeSandbox
- StackBlitz

### Community
- React subreddit
- TypeScript Discord
- Stack Overflow
- Dev.to

---

## Assessment Strategy

**Weekly Quizzes:** Short quizzes covering key concepts (10-15 questions)

**Module Projects:** Hands-on projects at the end of each module

**Code Reviews:** Peer review sessions for sharing and feedback

**Capstone Presentation:** Final project presentation and code walkthrough

---

## Learning Tips

1. **Code Daily:** Even 30 minutes of coding is better than long weekend sessions
2. **Build Real Projects:** Don't just follow tutorials, build your own ideas
3. **Read Documentation:** Get comfortable with official docs early
4. **Debug Actively:** Use debugger and console effectively
5. **Ask Questions:** Join communities and don't be afraid to ask
6. **Review Regularly:** Revisit earlier modules to reinforce learning
7. **Type Everything:** Avoid using `any` type - embrace TypeScript's benefits
8. **Test Your Code:** Write tests as you learn, not as an afterthought

---

## Course Completion Checklist

- [ ] Completed all 10 modules
- [ ] Built all module projects
- [ ] Passed weekly assessments
- [ ] Completed capstone project
- [ ] Deployed at least 3 projects
- [ ] Written tests for major features
- [ ] Participated in code reviews
- [ ] Created a developer portfolio

**Congratulations on completing the React TypeScript course!**

---

*This curriculum is designed to be flexible. Adjust the pace based on your learning speed and prior experience.*

<p align="center">
  <img alt="header" src="https://shieldcn.dev/header/gradient.svg?title=Praktikality+&amp;subtitle=A+tool+to+build+upon&amp;mode=dark&amp;image=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1550745165-9bc0b252726f%3Fw%3D1600%26q%3D70%26fit%3Dcrop%26fm%3Djpg" />
</p>

<p align="center">
  <a href="https://github.com/MCarlquist/praktikality/graphs/contributors"><img alt="contributors" src="https://shieldcn.dev/contributors/MCarlquist/praktikality.svg?mode=dark" /></a>
</p>

# Praktikality

> An internal CodeX platform that helps participants discover partner companies, explore internship and work-experience opportunities, and develop compelling project ideas with AI.

**Status:** 🚧 Active Development  
**Language:** 🇸🇪 Swedish user interface / 🇬🇧 English documentation  
**Deployment:** Vercel  
**Primary users:** CodeX participants and CodeX staff

---

## Overview

Praktikality is an internal platform developed for **CodeX** to help its participants explore companies that partner with CodeX and identify potential opportunities for internships and work experience.

The platform combines a company directory with AI-assisted project ideation. Participants can investigate a company's technology stack, generate potential project ideas tailored to that company, and indicate that they would like to work with the company.

When a participant expresses interest, CodeX staff are notified by email. Staff can then contact the participant and work with the company to determine whether a suitable internship or work-experience placement can be arranged.

The goal is to make the process more concrete for both participants and CodeX staff:

```text
Discover a company
       ↓
Understand what they do
       ↓
Explore their technology
       ↓
Generate potential project ideas
       ↓
Express interest
       ↓
CodeX staff are notified
       ↓
CodeX facilitates the match
       ↓
Internship / work experience
```

---

## Why Praktikality?

Finding a company is only part of the challenge when looking for an internship or work-experience placement.

A participant may find a company they are interested in but struggle with the next question:

> "What could I actually work on there?"

Praktikality uses AI to help bridge that gap.

By providing information about a company's technology stack, the platform can generate concrete project ideas that a participant can investigate and potentially use when discussing an opportunity with the company.

The AI is therefore not intended to replace the human matching process. Instead, it helps participants arrive at that conversation with more informed and potentially more compelling ideas.

---

# Features

## 🔎 Company Directory

Participants can browse and search companies that partner with CodeX.

Company information can include:

- Company name
- Company type
- Company size
- Location
- Website
- Contact information
- Programming languages / technologies
- Remote work availability
- Internship availability
- Participant information
- Existing interest from CodeX participants

The directory provides the primary entry point for discovering potential companies.

---

## 🏢 Company Profiles

Each company has a dedicated profile containing information relevant to participants considering an internship or work-experience placement.

A participant can use the profile to understand:

- What kind of company it is
- Where it is located
- What technologies it uses
- Whether it offers remote work
- Whether internships are available
- How many participants are already associated with the company
- How many participants have expressed interest

---

## 🤖 AI-Assisted Project Ideas

One of Praktikality's main features is AI-assisted project generation.

Participants can ask the platform to generate potential programming projects based on a company's technology stack.

For example:

```text
Company
  ├── Type
  └── Programming languages
          ↓
       AI model
          ↓
  Project suggestions
```

The generated ideas are intended to help participants think about projects that could provide value to the company while also giving the participant meaningful practical experience.

The AI integration currently uses the OpenAI SDK against an OpenAI-compatible Hugging Face inference endpoint.

### Current AI behaviour

The API:

- Requires an authenticated user
- Validates incoming data
- Limits the number of programming languages supplied
- Limits input lengths
- Applies per-user rate limiting
- Requests multiple project ideas from the model
- Returns the generated project ideas as Markdown

The current implementation generates **four project ideas**.

### Current limitation

The programming-language information is taken dynamically from the company.

However, the company-type context supplied to the AI is currently hard-coded in the frontend.

This means the AI project-generation feature is implemented, but its company-specific contextualisation is still under active development.

---

## 📩 Expressing Interest

When a participant finds a company they would like to work with, they can select:

> **Ja, Gärna**

This means that the participant would like CodeX to consider them for an opportunity with that company.

The workflow is:

```text
Participant
    │
    │ "Ja, Gärna"
    ▼
Praktikality
    │
    ├── Records participant interest
    │
    └── Sends notification
             │
             ▼
        CodeX staff
             │
             ▼
    Contact participant
             │
             ▼
      Human matching process
```

The application also prevents a participant from repeatedly submitting the same interest for a company.

### Important distinction

Praktikality does **not** automatically match a participant with a company.

The actual matching process remains a human process handled by CodeX staff.

---

## 📧 CodeX Staff Notifications

When a participant expresses interest in a company, Praktikality triggers an email notification.

The notification contains information about:

- The participant
- The company they are interested in

CodeX staff can then contact the participant and begin the matching process.

### Development status

The email integration is implemented using **Resend**, but the current repository configuration uses Resend's development/test addresses.

Before production use, the email sender and recipient configuration needs to be replaced with the appropriate CodeX addresses and verified domain configuration.

---

# 👥 Administration

Praktikality contains an administrative area intended for **CodeX staff**.

The administrative interface includes functionality for managing:

- Companies
- Participants/users
- Participant internship preferences
- Company participants

The current administrative routes include:

```text
/admin
/admin/company
/admin/company/new
/admin/company/[company_name]
/admin/users
```

---

## Company Administration

CodeX staff can currently:

- View companies
- Search companies
- Create companies
- Delete companies
- Associate participants with companies

### Current limitation

General-purpose company editing is not yet completely implemented.

The current `PUT` company API operation is primarily used for adding participants rather than providing a complete company update operation.

A future version should provide full CRUD semantics for company records.

---

## User Administration

The administrative user interface provides functionality for managing participant records.

Current functionality includes:

- Listing users
- Updating internship preferences
- Removing users

---

# 🔐 Authentication

Authentication is provided by **Supabase Auth**.

The application currently supports:

- User registration
- Email/password login
- Logout
- Session handling
- Email confirmation handling
- Forgotten-password flow
- Password updates

Authenticated users are redirected to the company directory after login.

---

# ⚠️ Authorization & Security

Praktikality is an **internal CodeX application under active development**.

Authentication is implemented, but administrative authorization requires further hardening before the application should be considered production-ready.

The repository contains an `isAdmin()` helper intended to determine whether a user has administrative privileges. However, the implementation is currently marked as a TODO, and the administrative API routes should not currently be described as fully protected by server-side role-based authorization.

This is an active development item.

### Before production use

The following should be verified and/or implemented:

- Server-side admin authorization on every administrative API route
- Appropriate Supabase Row Level Security policies
- Least-privilege database access
- Validation of all administrative operations
- Production email configuration
- Protection of sensitive participant information
- Review of API rate limits
- Review of authentication and session behaviour

---

# 🗄️ Database

Praktikality uses **Supabase PostgreSQL**.

The current application data model primarily consists of:

```text
profiles
companies
```

## `profiles`

Participant profile information includes fields such as:

- User ID
- Email
- Role
- Internship preference
- Companies they work at

Roles currently include the concept of:

```text
user
admin
```

where `admin` represents CodeX staff.

## `companies`

Company records contain information such as:

- Company name
- Contact information
- Website
- Company type
- Company size
- Location
- Programming languages / technologies
- Remote-work status
- Internship status
- Participants
- Participants interested in the company

The repository contains generated TypeScript database types in:

```text
database.types.ts
```

These types should be regenerated whenever the Supabase database schema changes.

---

# 🏗️ Architecture

At a high level, Praktikality follows this architecture:

```text
                         ┌──────────────────┐
                         │      User        │
                         │    Browser       │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │     Next.js      │
                         │ React / App      │
                         │ Router           │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
             ┌────────────┐ ┌───────────┐ ┌─────────────┐
             │ Supabase   │ │ AI API    │ │ Email API   │
             │ Auth / DB  │ │           │ │             │
             └────────────┘ └─────┬─────┘ └──────┬──────┘
                                   │              │
                                   ▼              ▼
                            Hugging Face        Resend
                              Inference
```

---

# 🧰 Technology Stack

| Area | Technology |
|---|---|
| Framework | Next.js |
| Language | TypeScript |
| UI | React |
| Styling | Tailwind CSS |
| UI components | Radix UI / shadcn/ui |
| Authentication | Supabase Auth |
| Database | Supabase PostgreSQL |
| Database client | `@supabase/ssr` |
| Forms | React Hook Form |
| Tables | TanStack React Table |
| AI integration | OpenAI SDK |
| AI inference | Hugging Face |
| Email | Resend |
| Markdown | React Markdown |
| Icons | Lucide React |
| Notifications | Sonner / React Toastify |
| Deployment | Vercel |
| CI | GitHub Actions |
| Local backend | Supabase CLI |

---

# 📁 Project Structure

The application uses the Next.js App Router.

A simplified view of the project structure is:

```text
praktikality/
├── app/
│   ├── admin/
│   │   ├── company/
│   │   ├── users/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   ├── admin/
│   │   │   ├── company/
│   │   │   └── users/
│   │   ├── ai/
│   │   │   └── company/
│   │   └── email/
│   │
│   ├── company/
│   │   └── [company_name]/
│   │
│   ├── directory/
│   │
│   ├── login/
│   ├── signup/
│   └── ...
│
├── components/
│   ├── ui/
│   └── ...
│
├── lib/
│   ├── supabase/
│   ├── email.ts
│   └── ...
│
├── supabase/
│   └── config.toml
│
├── database.types.ts
├── package.json
├── tsconfig.json
└── README.md
```

The exact structure will evolve as development continues.

---

# 🔌 API

The application contains several internal API routes.

## AI

```text
POST /api/ai/company
```

Generates project ideas based on company information.

Authentication is required.

The endpoint performs input validation and applies rate limiting.

---

## Email

```text
POST /api/email
```

Triggers a notification when a participant expresses interest in a company.

---

## Administration — Companies

```text
GET    /api/admin/company
POST   /api/admin/company
PUT    /api/admin/company
DELETE /api/admin/company
```

These endpoints provide administrative company operations.

The `PUT` implementation currently focuses on participant association rather than complete company editing.

---

## Administration — Users

```text
GET    /api/admin/users
PUT    /api/admin/users
DELETE /api/admin/users
```

These endpoints support administrative user management.

---

# 💻 Local Development

Praktikality supports both remote Supabase development and local Supabase development.

## Prerequisites

Install the following:

- Node.js
- npm
- Git
- Supabase CLI

A current Node.js version compatible with the project's Next.js version is recommended.

---

## Clone the repository

```bash
git clone https://github.com/MCarlquist/praktikality.git
cd praktikality
```

---

## Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a local environment file:

```text
.env.local
```

The application requires environment variables for its external services.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

HUGGING_FACE_TOKEN=
RESEND_API_KEY=
```

Do **not** commit `.env.local` or any file containing production secrets.

For local development, use development credentials wherever possible.

A future improvement is to maintain a committed `.env.example` file containing the required variable names without secret values.

---

# ▶️ Run the Development Server

The project's development script uses port `4000`.

```bash
npm run dev
```

The application should then be available at:

```text
http://localhost:4000
```

---

# 🧪 Local Supabase Development

The repository includes a Supabase configuration intended to support local development.

The local environment includes services such as:

- PostgreSQL
- Supabase API
- Supabase Auth
- Supabase Studio
- Inbucket for local email testing

Start the local Supabase environment with:

```bash
supabase start
```

The Supabase CLI will display the local service URLs and credentials.

Stop it with:

```bash
supabase stop
```

---

## Supabase Studio

When running Supabase locally, Studio is available through the local Supabase environment.

Use it to inspect:

- Tables
- Authentication
- Database records
- SQL
- Policies
- Database configuration

---

## Local Email Testing

Supabase's local configuration includes **Inbucket**, allowing authentication-related email flows to be tested without sending real emails.

This is useful when testing:

- Signup confirmation
- Password recovery
- Other Supabase-generated emails

---

# 🧬 Database Types

The repository contains generated Supabase TypeScript definitions:

```text
database.types.ts
```

When the database schema changes, regenerate the types using the Supabase CLI.

For example:

```bash
supabase gen types typescript --local > database.types.ts
```

For a remote project, use the appropriate Supabase project configuration.

Always verify the generated file after schema changes.

---

# 🚀 Deployment

The application is intended to run on **Vercel**.

A typical deployment architecture is:

```text
GitHub
   │
   ▼
Vercel
   │
   ├── Next.js application
   │
   ├── Supabase
   │
   ├── Hugging Face
   │
   └── Resend
```

Production environment variables must be configured in the deployment environment rather than committed to Git.

Before deploying a production version, verify:

- Supabase production project
- Authentication configuration
- Database schema
- Row Level Security policies
- Admin authorization
- Hugging Face credentials
- Resend credentials
- Verified email domain
- Correct CodeX notification recipient
- Production URLs

---

# 🤖 AI Configuration

The AI integration uses the OpenAI SDK with an OpenAI-compatible inference endpoint.

The AI endpoint is deliberately kept server-side so that credentials such as the Hugging Face token are not exposed to the browser.

The browser communicates with:

```text
/api/ai/company
```

rather than directly communicating with the AI provider.

This architecture allows the application to:

- Keep provider credentials private
- Validate requests
- Apply rate limiting
- Change AI providers/models without rewriting the frontend

---

# 📬 Email Configuration

Email functionality is encapsulated in:

```text
lib/email.ts
```

and exposed to the application through:

```text
/api/email
```

The application uses **Resend** for transactional email.

The current implementation is suitable for development/testing but requires production configuration before being used for real CodeX notifications.

In particular, the following should be configured:

```text
From address
    ↓
Verified CodeX domain

Recipient
    ↓
Actual CodeX staff address
```

---

# 🔒 Security Notes

Praktikality handles participant information and should therefore be treated as an internal application rather than a generic public demo.

### Secrets

Never commit:

```text
.env.local
API keys
Supabase service-role keys
Hugging Face tokens
Resend API keys
```

### Server-side credentials

Server-only credentials must never be exposed through variables prefixed with:

```text
NEXT_PUBLIC_
```

Only values genuinely intended for browser-side use should use that prefix.

### Administrative access

Administrative operations require additional server-side authorization hardening before the application should be considered production-ready.

### AI requests

The AI endpoint currently includes:

- Authentication checks
- Rate limiting
- Input limits
- Input validation

These protections should remain in place as the feature evolves.

---

# 🚧 Current Development Status

Praktikality is actively being developed.

The major product workflow is functional, but several areas are incomplete or require hardening.

## ✅ Implemented

### Participant functionality

- [x] User registration
- [x] Login
- [x] Logout
- [x] Password recovery
- [x] Password update
- [x] Authentication/session handling
- [x] Company directory
- [x] Company search
- [x] Company profiles
- [x] Company technology information
- [x] Participant interest registration
- [x] Duplicate-interest prevention
- [x] AI project generation
- [x] AI API authentication
- [x] AI input validation
- [x] AI rate limiting

### Administration

- [x] Admin dashboard UI
- [x] Company listing
- [x] Company search
- [x] Company creation
- [x] Company deletion
- [x] User listing
- [x] User management
- [x] Internship preference management
- [x] Participant/company association

### Infrastructure

- [x] Supabase integration
- [x] Supabase local-development configuration
- [x] Local email testing configuration
- [x] Vercel deployment configuration
- [x] GitHub Actions integration
- [x] Resend integration
- [x] Hugging Face AI integration

---

# 🟡 Partially Implemented

## Production email notifications

The email pipeline is implemented, but the current configuration uses Resend development/test addresses.

**Remaining work:**

- Configure verified CodeX sender domain
- Configure actual CodeX staff recipient(s)
- Verify production delivery
- Configure production environment variables

---

## Company-specific AI context

The AI receives dynamic programming-language information from each company.

However, company type is currently hard-coded in the client request.

**Remaining work:**

```text
Current:

Company languages ──────► AI
Hard-coded type ────────► AI


Target:

Company languages ───────► AI
Company type ────────────► AI
Company information ────► AI
```

The objective is for generated project ideas to be genuinely specific to the company being viewed.

---

## Company editing

Company creation and deletion are implemented.

General-purpose company editing is not yet complete.

A future implementation should allow CodeX staff to edit all relevant company fields through the administrative interface.

---

## Participant information

The application can retrieve participant-interest information and display counts.

However, some participant display functionality currently relies on test/sample data rather than a complete database-backed participant list.

---

# 🔴 Not Yet Implemented / Requires Work

## Complete administrative authorization

The application has the concept of an `admin` role and contains an admin helper, but server-side authorization for administrative API operations needs to be properly enforced.

This is a high-priority security task before exposing administrative functionality to an untrusted environment.

---

## Full participant/company matching

Praktikality currently facilitates the beginning of the matching process.

It does **not** automatically perform the final participant-to-company match.

The intended workflow remains:

```text
Participant expresses interest
             ↓
CodeX staff notification
             ↓
CodeX staff contacts participant
             ↓
CodeX staff coordinates with company
             ↓
Human decision / matching
```

Automated matching is not currently part of the system.

---

## Excel import

An Excel-import concept exists in the administrative UI/codebase, but a complete import workflow is not currently implemented.

---

# 🗺️ Potential Roadmap

The roadmap will evolve with CodeX's requirements, but current development priorities include:

### High priority

- [ ] Implement robust server-side admin authorization
- [ ] Configure production Resend email delivery
- [ ] Make AI company context fully dynamic
- [ ] Complete company editing
- [ ] Replace sample participant data with complete database-backed data
- [ ] Review and strengthen Supabase Row Level Security
- [ ] Create `.env.example`
- [ ] Improve automated tests

### Medium priority

- [ ] Complete Excel company import
- [ ] Improve participant/company relationship modelling
- [ ] Improve administrative workflows
- [ ] Add better error handling and user feedback
- [ ] Improve AI prompt quality
- [ ] Add AI project regeneration/customisation
- [ ] Improve search and filtering

### Future possibilities

- [ ] More sophisticated company/participant matching
- [ ] Participant project proposal workflow
- [ ] Company feedback
- [ ] Placement status tracking
- [ ] Communication history
- [ ] Analytics for CodeX staff
- [ ] Multi-language UI

---

# 🧪 Development Principles

When contributing to Praktikality, keep the primary product goal in mind:

> **Help CodeX participants turn interest in a company into a meaningful conversation about practical work.**

The AI should support that objective rather than becoming the objective itself.

Changes should preferably:

1. Improve the participant experience
2. Reduce administrative work for CodeX staff
3. Preserve participant privacy
4. Keep sensitive credentials server-side
5. Validate data at API boundaries
6. Maintain a clear separation between participant and administrative functionality
7. Keep the human matching process central unless automation is deliberately introduced

---

# 🐛 Known Limitations

This project is under active development. Known limitations include:

- Administrative server-side role enforcement requires additional work.
- Production email recipients are not yet configured in the repository's development implementation.
- AI company-type context is currently hard-coded.
- Full company editing is incomplete.
- Some participant information is represented by test/sample data.
- Excel importing is not fully implemented.
- Some areas of the codebase contain temporary implementations and TODOs.
- The database schema and application architecture are expected to evolve.

These limitations are documented deliberately so that the repository reflects the actual state of the software rather than presenting unfinished functionality as complete.

---

# 🧭 Troubleshooting

## Application does not start

Verify Node.js and dependencies:

```bash
node --version
npm --version
npm install
```

Then:

```bash
npm run dev
```

The application runs on:

```text
http://localhost:4000
```

---

## Supabase connection fails

Check:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Make sure the values correspond to the Supabase environment you intend to use.

For local development, make sure:

```bash
supabase start
```

has been run.

---

## AI generation fails

Check that:

```env
HUGGING_FACE_TOKEN=
```

is configured correctly.

Also verify that:

- The user is authenticated
- The company has programming-language data
- The request isn't exceeding the rate limit
- The Hugging Face model/provider is available

---

## Email notification fails

Check:

```env
RESEND_API_KEY=
```

Then verify the Resend configuration in:

```text
lib/email.ts
```

Remember that the repository currently uses development/test email addresses.

---

# 📜 License

No explicit open-source license is currently defined in the repository.

Praktikality is intended as an **internal CodeX application**.

Until an explicit license is added, contributors should not assume that the source code is freely licensed for redistribution or commercial use.

---

# 🤝 Contributing

Praktikality is currently an internal CodeX project.

Development contributions should be coordinated with the CodeX team and should respect the application's internal nature and participant data.

Before submitting changes:

```bash
npm install
npm run lint
npm run build
```

Review changes involving authentication, database access, participant information, or administrative functionality particularly carefully.

---

# 👨‍💻 Project

**Praktikality** was developed for CodeX to make it easier for participants to explore companies, develop meaningful project ideas, and communicate their interest in internship and work-experience opportunities.

The platform combines:

- Company discovery
- Company information
- AI-assisted project ideation
- Participant interest registration
- CodeX staff notifications
- Administrative management

The ultimate goal is simple:

> **Give participants better ideas, give CodeX better information, and make the path from "I'd like to work there" to "here's something useful I could build" a little shorter.**

---

## Current Status

**🚧 Active Development**

The core Praktikality workflow is implemented and functional, while security hardening, production email configuration, richer company data, and several administrative capabilities continue to be developed.

<p align="center">
  <img alt="chart" src="https://shieldcn.dev/chart/github/commits/torvalds.svg?theme=green" />
</p>

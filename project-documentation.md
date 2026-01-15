# Look in Dharamshala - Final Project Documentation

## 1. Project Overview

This document provides a comprehensive, final overview of the "Look in Dharamshala" web application. The project is a modern, visually rich tourism platform designed to be the ultimate travel guide for exploring Dharamshala. It connects travelers with local businesses, showcases the region's beauty, and provides practical tools for trip planning. The entire application is powered by a secure **Supabase** backend for data management and admin authentication.

---

## 2. Frontend Architecture & Technologies

The application is built with a modern, robust, and scalable frontend stack.

-   **Build Tool:** Vite - For lightning-fast development and optimized production builds.
-   **Framework:** React 18.2.0 - Using functional components and hooks for a declarative and efficient UI.
-   **Routing:** React Router 6.16.0 - For seamless client-side navigation between pages.
-   **Styling:** TailwindCSS 3.3.2 - A utility-first CSS framework for rapid, custom UI development.
-   **UI Components:** shadcn/ui - A collection of beautifully designed, accessible, and reusable components.
-   **Animations:** Framer Motion 10.16.4 - For creating fluid and engaging animations and transitions.
-   **Icons:** Lucide React - A comprehensive and beautiful icon library.

---

## 3. Backend & Data Management (Supabase)

The entire backend is powered by Supabase, an open-source Firebase alternative that provides a suite of tools for building secure and scalable applications.

### 3.1. Supabase Setup

-   **Client:** The Supabase client is initialized in `src/lib/customSupabaseClient.js` and connects to your project using the provided URL and anon key.
-   **Authentication:** User authentication is managed via `src/contexts/SupabaseAuthContext.jsx`. It handles admin sign-in, sign-out, and session management using Supabase's secure authentication services.
-   **Database:** The application uses Supabase's PostgreSQL database to store and manage data.

### 3.2. Database Tables

Two primary tables are used:

1.  **`businesses`**:
    -   **Purpose:** Stores submissions from the "List Your Business" form.
    -   **Columns:** `id`, `businessName`, `ownerName`, `phone`, `email`, `category`, `description`, `status` (pending, approved, rejected).
    -   **Workflow:** When a business owner submits the form, a new row is created with a `pending` status. An admin can then approve or reject this submission from the dashboard.

2.  **`services`**:
    -   **Purpose:** Stores the live, approved services and attractions displayed on the website.
    -   **Columns:** `id`, `name`, `category`, `description`, `location`, `image`, `rating`, `contact`.
    -   **Workflow:** When an admin approves a pending business, its details are used to create a new entry in this table. Admins can also add, edit, and delete services directly from the dashboard.

### 3.3. Real-time Functionality

The application uses Supabase's real-time capabilities to instantly update the UI when data changes in the database. This is achieved by subscribing to database changes in `ServicesContext.jsx` and `PendingListings.jsx`, ensuring the admin dashboard and service pages always show the most current information without needing a page refresh.

---

## 4. Page & Component Breakdown

### 4.1. Core Pages (Public)

-   **`HomePage.jsx`**: The landing page, featuring a hero section, search bar, and overviews of other sections.
-   **`ServicesPage.jsx`**: Displays all approved services and attractions from the `services` table.
-   **`ServiceDetailPage.jsx`**: Shows detailed information about a single service.
-   **`ListBusinessPage.jsx`**: A form that allows local business owners to submit their business for inclusion on the site. Submissions are added to the `businesses` table.
-   **`PlanTripPage.jsx` / `ContactPage.jsx` / etc.**: Static and informational pages.

### 4.2. Admin Section (Private)

-   **`AdminLoginPage.jsx`**: A secure login page for the administrator. Access is granted via Supabase Authentication.
-   **`AdminDashboardPage.jsx`**: The central hub for website management, protected by `PrivateRoute.jsx`. It contains two main tabs:
    -   **Pending Listings:** (`PendingListings.jsx`) Fetches and displays all businesses with a `pending` status from the `businesses` table. The admin can approve or reject them.
    -   **Manage Services:** (`ManageServices.jsx`) Fetches and displays all services from the `services` table. The admin can add new services, edit existing ones, or delete them.
-   **`PrivateRoute.jsx`**: A wrapper component that checks if a user is authenticated before rendering its children. If not, it redirects to the `/admin/login` page.

### 4.3. Key Reusable Components

-   **`Navbar.jsx`**: The main navigation bar for the website.
-   **`Footer.jsx`**: The website footer, which now includes the "Admin Portal" link for easy access to the login page.
-   **`ServiceFormModal.jsx`**: A dialog/modal component used in the admin dashboard for both adding a new service and editing an existing one.
-   **UI Components (`/components/ui`)**: Core building blocks like `Button.jsx`, `Card.jsx`, `Input.jsx`, and `Dialog.jsx`, built using shadcn/ui principles.

---

## 5. How to Manage Your Website

### 5.1. Logging In as an Admin

1.  Navigate to the website's homepage.
2.  Scroll down to the footer at the bottom of the page.
3.  Click on the **"Admin Portal"** link.
4.  You will be taken to the `/admin/login` page.
5.  Enter the email and password you created in your Supabase project's Authentication section.
6.  Upon successful login, you will be redirected to the admin dashboard.

### 5.2. Approving New Businesses

1.  In the admin dashboard, click on the **"Pending Listings"** tab.
2.  You will see a list of all businesses that have been submitted but not yet reviewed.
3.  Click **"Approve"** to add the business to the public `services` list and mark its status as `approved`.
4.  Click **"Reject"** to mark its status as `rejected`. It will not be shown on the site.

### 5.3. Managing Live Services

1.  In the admin dashboard, click on the **"Manage Services"** tab.
2.  To add a new service manually, click the **"Add New Service"** button and fill out the form.
3.  To edit an existing service, find it in the list and click the **"Edit"** button.
4.  To remove a service permanently, click the **"Delete"** button and confirm the action.

This concludes the final documentation for the "Look in Dharamshala" project. The website is now fully functional, polished, and ready for use.

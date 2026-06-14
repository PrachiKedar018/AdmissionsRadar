# AdmissionsRadar

AdmissionsRadar is a simple tool for colleges to collect and review student applications. It automatically checks if a student is eligible for a course based on their marks and entrance exam scores.

## Main Features

- **Application Form**: Counselors can submit student details, school marks, and entrance exam status (JEE/NEET).
- **Dashboard**: Admins and viewers can see all applications in a table.
  - **Global Search**: Search the table instantly by name, ID, or course.
  - **Eligibility Filter**: Filter the table to see only "Eligible" or "Not Eligible" students.
- **Detail View**: Admins can open any student's record to read detailed eligibility feedback.
- **Security Guards**: Automatic role checks to protect views (e.g., counselors can only view the form, viewers can only view the dashboard).

---

## User Roles

1. **Counselor**: Can fill out and submit the application form.
2. **Viewer**: Can view the dashboard list.
3. **Admin**: Can view the dashboard list and open application detail profiles.

---

## How to Run the App

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm start
   ```
   Now open your browser at [http://localhost:4200/](http://localhost:4200/).

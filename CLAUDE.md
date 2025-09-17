# Claude Code Rules

1. Before starting any task, ensure the project has proper structure: create a tasks/ folder with a todo.md file inside if they don't already exist.

2. Think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md.

3. The plan should have a list of todo items that you can check off as you complete them.

4. Before you begin working, check in with me and I will verify the plan.

5. Then, begin working on the todo items, marking them as complete as you go.

6. Please every step of the way just give me a high level explanation of what changes you made.

7. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.

8. After completing each feature or significant change:
   - Run the code to ensure it works
   - Check for any security issues (no API keys in frontend, no exposed sensitive data)
   - Tell me to commit to Git if everything works correctly

9. If you encounter an error:
   - Stop immediately and explain the error
   - Don't try multiple fixes without asking
   - Suggest rolling back to the last working version if needed

10. For environment variables and secrets:
    - Always use .env.local or .env files
    - Never hardcode API keys, passwords, or sensitive data
    - Create a .env.example file showing what variables are needed (without actual values)

11. Finally, add a review section to the todo.md file with:
    - Summary of changes made
    - Any new dependencies added
    - Any environment variables that need to be set
    - Known limitations or future improvements needed
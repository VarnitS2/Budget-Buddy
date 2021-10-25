# A Web-App called BudgetBuddy

Varnit Sinha (varnits2) | Moderator: Jiaming Zhang (jz32)

This is a web-app about creating a personalized budget manager and analyzer for college students.

## Abstract

### Project Purpose

Most college students worry about their day to day spendings -- how much they spend on take out food or whether they can afford to go to that concert coming to campus. According to the US Department of Education, over 40% of full-time undergraduate students work a job, using this opportuntity to start to become financially responsible.

The purpose of this project is to introduce a personalized way to view your budget spending and breakdown. With an easy to use UI to input data, and powerful backend algorithms, the user will be able to view their spending between date ranges, as a percentage of their income, and which category they spend the most on.

### Project Motivation

When I got a job at UIUC, I always wanted to make a budget app that would specifically track spending how I needed it to. I wanted to see how much of my paycheck I was spending and hopefully gain better control over my money (and save up for loans!). I hope that through this application I can add an aspect of financial responsibility to my life -- and so can others!

## Technical Specification

- Platform: Web
- Programming Languages: Python, JavaScript, HTML, CSS
- Frameworks: Flask/Django, React, Material-UI
- Stylistic Conventions: Python PEP-8 Style Guide, Airbnb JavaScript Style Guide
- IDE: Visual Studio Code

## Functional Specification

- Implement a user system complete with registration, login, logout, and profile deletion.
- Create and maintain a database of user transactions
- Perform analysis on this data based on points of interest like balance breakdown, top spending categories, spending trends, and more.
- Create a responsive website with aesthetic yet functional UI to display data and analysis results.

## Brief Timeline

- Week 1: Create Users database, create Transactions database, implement api endpoints
- Week 2: Create data analysis endpoints, create GUI views for User flow, create homepage views
- Week 3: Create GUI views for data analysis flow, visualize data using third-party libraries, enforce proper page routing

## GUI Mockup
![](GUI.jpg "GUI")

## Rubrics

### Week 1

| Category         | Total Score Allocated | Detailed Rubrics                                                                                                                                                                                                                                                    |
| ---------------- | :-------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Users Database Setup   |           5           | 0: No database <br> +1: System setup and connection to database <br> +1: System writes to database without errors <br> +1: System reads from database without errors <br> +1: System reads from database based on provided condition <br> +1: Proper error handling |
| Transactions Database Setup   |           5           | +1: Same as Users Database Setup |
| API              |           5           | 0: No API implementation <br> +1: Successful GET operations <br> +1: Successful POST operations <br> +1: Successful PUT operations <br> +1: Successful DELETE operations <br> +1: Proper error handling |
| Database Unit Tests       |           5           | 0: No tests <br> +1: For every 2 unit tests for database operations|
| API Unit Tests |           5           | 0: No tests <br> +1: For every 2 unit tests for api endpoint operations |

### Week 2

| Category         | Total Score Allocated | Detailed Rubrics |
| ---------------- | :-------------------: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Data Analysis Endpoints    |           5           | 0: No endpoints <br> +1: Balance breakdown <br> +1: Top spending categories <br> +2: Spending trends <br> +1: Proper error handling   |
| User Flow Views    |           5           | 0: No views <br> +1: User registration view <br> +1: User login view <br> +1: User logout view <br> +1: User profile deletion flow <br> +1: Proper error handling |
| Homepage Views        |           5           | 0: No views <br> +1: For supporting each api endpoint from previous week |
| Unit Tests       |           5           | 0: No tests <br> +1: For every 2 unit tests |
| Manual Test Plan |           5           | 0: No manual test plan <br> +1: For every 2 views tested |

### Week 3

| Category           | Total Score Allocated | Detailed Rubrics                                                                                                                          |
| ------------------ | :-------------------: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Data Analysis Flow      |           5           | 0: No GUI extension <br> +1: For each successful integration of data analysis options from previous week <br> +1: Proper error handling   |
| Data Visualization |           5           | 0: No data visualization <br> +2: For using a third-party library for visualization <br> +1: For each successful data point visualization |
| Page Routing       |           5           | 0: No routing/single page application <br> +1: For each distinct route |
| Unit Tests         |           5           | 0: No tests <br> +1: For every 2 unit tests |
| Manual Test Plan   |           5           | 0: No manual test plan <br> +1: For every 2 screens tested |

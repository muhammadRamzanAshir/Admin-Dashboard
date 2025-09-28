# 🖥️ Scraper Admin Dashboard  

A responsive **Admin Dashboard** built with **HTML, CSS, Bootstrap 5, and vanilla JavaScript** for managing and monitoring web scraping tasks.  

This dashboard is designed as a lightweight frontend template that you can connect to your backend (e.g., Django, Flask, Node.js, PHP) for full functionality.  

---

## 🚀 Features  

- 📊 **Dashboard Overview Cards** – Show scraping stats (total sources, running jobs, last run, logs).  
- 🗂️ **Sources Management Table** – Add, edit, and view data sources for scraping.  
- ⏳ **Scrape Jobs Table** – Monitor job status, schedule, and trigger runs manually.  
- 📝 **Run Logs Panel** – View live scraping logs (scrollable panel).  
- ➕ **Modal Forms** – Add new sources and jobs without leaving the page.  
- 📥 **Export Data** – Download table data as CSV.  
- 🔔 **Toast Notifications** – Success/error popups for quick feedback.  
- 📱 **Responsive Layout** – Works on desktop, tablet, and mobile screens.  

---

## 🛠️ Tech Stack  

- **HTML5** – Structure  
- **CSS3 / Custom CSS** – Styling  
- **Bootstrap 5** – Responsive layout and components  
- **JavaScript (Vanilla)** – UI interactions (modals, toasts, CSV export)  

---

## 📂 Project Structure  

admin-dashboard/
│── index.html # Main dashboard file
│── css/
│ └── styles.css # Custom styles (optional)
│── js/
│ └── app.js # Custom JavaScript
│── README.md # Documentation

yaml
Copy code

---

## ⚡ Usage  

1. Clone or download the repo.  
   ```bash
   git clone https://github.com/your-username/admin-dashboard.git
   cd admin-dashboard
Open index.html in your browser.

Works without a server (pure static).

Integrate with your backend:

Replace mock data in the tables with real API calls.

Hook up “Run Now” button to trigger scraper jobs.

Save logs dynamically from backend.

🎨 Customization
Modify Bootstrap classes or add new styles in styles.css.

Change dashboard cards to match your KPIs.

Adjust table columns for your scraping use case.

📸 Screenshot
<img width="1896" height="969" alt="one" src="https://github.com/user-attachments/assets/d191bcce-bca4-4115-8f29-75eacca027c1" />
<img width="1896" height="4791" alt="two" src="https://github.com/user-attachments/assets/55ebead4-ad2d-42dc-80b1-aa949e24f0bf" />
<img width="1920" height="852" alt="three" src="https://github.com/user-attachments/assets/8362d0b4-427a-42ea-b3bf-670becc2b530" />
<img width="1896" height="1143" alt="four" src="https://github.com/user-attachments/assets/3d0125f7-d047-4903-aa52-c1a589dd3fd9" />
<img width="1896" height="1017" alt="5" src="https://github.com/user-attachments/assets/3ab5a33c-0741-4399-8cae-537e7346a190" />
<img width="2083" height="1374" alt="screenshot" src="https://github.com/user-attachments/assets/d49b223d-507b-4e81-8a00-f0c8390149f2" />



📜 License
This project is MIT Licensed – free to use and modify.

💡 Tip
If you’re connecting this dashboard to Django/Flask, place the HTML inside your templates and update forms/tables to use dynamic data.


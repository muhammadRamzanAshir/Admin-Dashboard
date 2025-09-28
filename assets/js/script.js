bulkStartScrapers() {
	const allToggles = document.querySelectorAll('.action-btn.toggle');
	let startedCount = 0;
	allToggles.forEach(toggle => {
		if (!toggle.classList.contains('active')) {
			const scraperItem = toggle.closest('.scraper-item');
			const statusElement = scraperItem.querySelector('.scraper-status');
			toggle.classList.add('active');
			statusElement.textContent = 'Running';
			statusElement.className = 'scraper-status running';
			scraperItem.classList.add('active');
			startedCount++;
		}
	});
	if (startedCount > 0) {
		this.showNotification(`Started ${startedCount} scrapers`);
	} else {
		this.showNotification('All scrapers are already running');
	}
}

bulkStopScrapers() {
	const allToggles = document.querySelectorAll('.action-btn.toggle');
	let stoppedCount = 0;
	allToggles.forEach(toggle => {
		if (toggle.classList.contains('active')) {
			const scraperItem = toggle.closest('.scraper-item');
			const statusElement = scraperItem.querySelector('.scraper-status');
			toggle.classList.remove('active');
			statusElement.textContent = 'Stopped';
			statusElement.className = 'scraper-status stopped';
			scraperItem.classList.remove('active');
			stoppedCount++;
		}
	});
	if (stoppedCount > 0) {
		this.showNotification(`Stopped ${stoppedCount} scrapers`);
	} else {
		this.showNotification('All scrapers are already stopped');
	}
}

addCustomScraper() {
	// Simulate adding a custom scraper
	this.showNotification('Opening custom scraper wizard...');
	setTimeout(() => {
		const customScraperHtml = `
        <div class="scraper-item" data-scraper="custom">
            <div class="scraper-icon" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                <i class="fas fa-plus"></i>
            </div>
            <div class="scraper-info">
                <h4>Custom Scraper</h4>
                <p>Your custom data source</p>
                <div class="scraper-status stopped">Stopped</div>
            </div>
            <div class="scraper-actions">
                <button class="action-btn configure"><i class="fas fa-cog"></i></button>
                <button class="action-btn toggle"><i class="fas fa-power-off"></i></button>
            </div>
        </div>
    `;
		// Add to the first category for demonstration
		const firstCategory = document.querySelector('.scrapers-list');
		if (firstCategory) {
			firstCategory.insertAdjacentHTML('beforeend', customScraperHtml);
			// Re-attach event listeners to new element
			const newItem = firstCategory.lastElementChild;
			newItem.addEventListener('click', () => this.selectScraper(newItem));
			const configBtn = newItem.querySelector('.action-btn.configure');
			const toggleBtn = newItem.querySelector('.action-btn.toggle');
			configBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				this.configureScraper(configBtn);
			});
			toggleBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				this.toggleScraper(toggleBtn);
			});
			this.showNotification('Custom scraper added successfully!');
			// Scroll to the new item
			newItem.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest'
			});
		}
	}, 2000);
}

showScraperConfig(scraperName) {
	// Create a simple configuration modal simulation
	const configModal = document.createElement('div');
	configModal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
`;

configModal.innerHTML = `
    <div style="
        background: white;
        padding: 30px;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        animation: scaleIn 0.3s ease;
    ">
        <h3 style="margin: 0 0 20px 0; color: var(--text-primary);">${scraperName} Configuration</h3>
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Scraping Interval (minutes)</label>
            <input type="number" value="30" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Max Results per Page</label>
            <input type="number" value="100" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px;">
        </div>
        <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Target Regions</label>
            <select style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px;">
                <option>All Regions</option>
                <option>North America</option>
                <option>Europe</option>
                <option>Asia Pacific</option>
            </select>
        </div>
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
            <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" 
                    style="padding: 10px 20px; border: 1px solid var(--border-color); background: white; border-radius: 4px; cursor: pointer;">
                Cancel
            </button>
            <button onclick="this.closest('div[style*=\"position: fixed\"]').remove(); window.dashboardApp.showNotification('${scraperName} configuration saved!');" 
                    style="padding: 10px 20px; background: var(--primary-blue); color: white; border: none; border-radius: 4px; cursor: pointer;">
                Save Changes
            </button>
        </div>
    </div>
`;

	// Add animation styles
	const style = document.createElement('style');
	style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes scaleIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
	document.head.appendChild(style);
	document.body.appendChild(configModal);
	// Close on backdrop click
	configModal.addEventListener('click', (e) => {
		if (e.target === configModal) {
			configModal.remove();
			document.head.removeChild(style);
		}
	});
}
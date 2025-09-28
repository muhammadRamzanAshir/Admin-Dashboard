        class DashboardApp {
            constructor() {
                this.currentTab = 'dashboard';
                this.selectedItems = new Set();
                this.init();
            }

            init() {
                this.setupTabNavigation();
                this.setupExportFunctionality();
                this.setupDashboardControls();
                this.setupScraperControls();
            }

            setupTabNavigation() {
                const navItems = document.querySelectorAll('.nav-item');
                const tabContents = document.querySelectorAll('.tab-content');

                navItems.forEach(item => {
                    item.addEventListener('click', () => {
                        const targetTab = item.getAttribute('data-tab');
                        
                        // Update navigation
                        navItems.forEach(nav => nav.classList.remove('active'));
                        item.classList.add('active');
                        
                        // Update content
                        tabContents.forEach(content => content.classList.remove('active'));
                        document.getElementById(targetTab).classList.add('active');
                        
                        this.currentTab = targetTab;
                    });
                });
            }

            setupExportFunctionality() {
                // Individual checkbox clicks
                document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
                    checkbox.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.toggleSelection(checkbox);
                    });
                });

                // Row clicks
                document.querySelectorAll('.table-row').forEach(row => {
                    row.addEventListener('click', () => {
                        const checkbox = row.querySelector('.custom-checkbox');
                        this.toggleSelection(checkbox);
                    });
                });

                // Select all button
                const selectAllBtn = document.getElementById('selectAllBtn');
                if (selectAllBtn) {
                    selectAllBtn.addEventListener('click', () => {
                        this.toggleSelectAll();
                    });
                }

                // Individual download buttons
                document.querySelectorAll('.download-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.downloadItem(btn);
                    });
                });

                // Bulk download button
                const bulkDownloadBtn = document.getElementById('bulkDownloadBtn');
                if (bulkDownloadBtn) {
                    bulkDownloadBtn.addEventListener('click', () => {
                        this.downloadSelected();
                    });
                }
            }

            setupDashboardControls() {
                // Control buttons
                document.querySelectorAll('.control-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                    });
                });

                // Simulate real-time stats
                this.startStatsAnimation();
            }

            toggleSelection(checkbox) {
                const rowId = checkbox.getAttribute('data-row');
                const row = document.querySelector(`[data-id="${rowId}"]`);
                
                if (checkbox.classList.contains('checked')) {
                    checkbox.classList.remove('checked');
                    row.classList.remove('selected');
                    this.selectedItems.delete(rowId);
                } else {
                    checkbox.classList.add('checked');
                    row.classList.add('selected');
                    this.selectedItems.add(rowId);
                }
                
                this.updateExportUI();
            }

            toggleSelectAll() {
                const allCheckboxes = document.querySelectorAll('.custom-checkbox');
                const selectAllBtn = document.getElementById('selectAllBtn');
                
                if (this.selectedItems.size === allCheckboxes.length) {
                    // Deselect all
                    this.selectedItems.clear();
                    allCheckboxes.forEach(checkbox => {
                        checkbox.classList.remove('checked');
                        const rowId = checkbox.getAttribute('data-row');
                        document.querySelector(`[data-id="${rowId}"]`).classList.remove('selected');
                    });
                    selectAllBtn.textContent = 'Select All';
                } else {
                    // Select all
                    allCheckboxes.forEach(checkbox => {
                        const rowId = checkbox.getAttribute('data-row');
                        checkbox.classList.add('checked');
                        document.querySelector(`[data-id="${rowId}"]`).classList.add('selected');
                        this.selectedItems.add(rowId);
                    });
                    selectAllBtn.textContent = 'Deselect All';
                }
                
                this.updateExportUI();
            }

            updateExportUI() {
                const selectedCount = document.getElementById('selectedCount');
                const bulkDownloadBtn = document.getElementById('bulkDownloadBtn');
                const selectAllBtn = document.getElementById('selectAllBtn');
                const totalItems = document.querySelectorAll('.custom-checkbox').length;
                
                if (selectedCount) {
                    selectedCount.textContent = `${this.selectedItems.size} items selected`;
                }
                
                if (bulkDownloadBtn) {
                    if (this.selectedItems.size > 0) {
                        bulkDownloadBtn.classList.add('active');
                    } else {
                        bulkDownloadBtn.classList.remove('active');
                    }
                }
                
                if (selectAllBtn) {
                    if (this.selectedItems.size === totalItems) {
                        selectAllBtn.textContent = 'Deselect All';
                    } else {
                        selectAllBtn.textContent = 'Select All';
                    }
                }
            }

            async downloadItem(button) {
                const itemName = button.getAttribute('data-item');
                
                // Add loading state
                const originalText = button.textContent;
                button.textContent = 'Downloading...';
                button.disabled = true;
                button.style.opacity = '0.6';
                
                // Simulate download
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Reset button state
                button.textContent = originalText;
                button.disabled = false;
                button.style.opacity = '1';
                
                this.showNotification(`Downloaded: ${itemName}`);
            }

            async downloadSelected() {
                if (this.selectedItems.size === 0) return;
                
                const bulkBtn = document.getElementById('bulkDownloadBtn');
                const originalText = bulkBtn.textContent;
                bulkBtn.textContent = 'Downloading...';
                bulkBtn.disabled = true;
                
                // Simulate bulk download
                await new Promise(resolve => setTimeout(resolve, 3000));
                
                bulkBtn.textContent = originalText;
                bulkBtn.disabled = false;
                this.showNotification(`Downloaded ${this.selectedItems.size} items successfully!`);
            }

            showNotification(message) {
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #4caf50;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 4px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    z-index: 1000;
                    animation: slideIn 0.3s ease;
                `;
                notification.textContent = message;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideIn 0.3s ease reverse';
                    setTimeout(() => {
                        if (document.body.contains(notification)) {
                            document.body.removeChild(notification);
                        }
                    }, 300);
                }, 3000);
            }

            startStatsAnimation() {
                // Animate CPU and RAM bars periodically
                setInterval(() => {
                    const cpuBar = document.querySelector('.stat-bar-visual.cpu');
                    const ramBar = document.querySelector('.stat-bar-visual.ram');
                    const cpuValue = document.querySelector('.stat-item:first-child .stat-value');
                    const ramValue = document.querySelector('.stat-item:nth-child(2) .stat-value');
                    
                    if (cpuBar && ramBar && cpuValue && ramValue) {
                        const newCpuValue = Math.floor(Math.random() * 40) + 40;
                        const newRamValue = Math.floor(Math.random() * 30) + 40;
                        
                        cpuBar.style.setProperty('--width', newCpuValue + '%');
                        ramBar.style.setProperty('--width', newRamValue + '%');
                        cpuValue.textContent = newCpuValue + '%';
                        ramValue.textContent = newRamValue + '%';
                        
                        // Update CSS custom properties for the bars
                        cpuBar.style.setProperty('width', `${newCpuValue}%`);
                        ramBar.style.setProperty('width', `${newRamValue}%`);
                    }
                }, 5000);
            }
        }

        // Add CSS animation for notifications
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Initialize the application when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new DashboardApp();
        });
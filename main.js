(async function() {
    if (typeof window.__rwScraperCleanup === 'function') {
        try {
            window.__rwScraperCleanup();
        } catch (cleanupErr) {}
    }
    const existingUi = document.getElementById('rw-scraper-ui');
    if (existingUi) existingUi.remove();
    const existingStyle = document.getElementById('rw-scraper-style');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'rw-scraper-style';
    style.textContent = `
        #rw-scraper-ui { position: fixed; bottom: 24px; right: 24px; width: 627px; background: #18181b; color: #e4e4e7; border: 1px solid #7c3aed; border-radius: 12px; z-index: 2147483647; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; box-shadow: 0 10px 30px rgba(0,0,0,0.7); display: flex; flex-direction: column; overflow: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); opacity: 0.95; user-select: none; }
        #rw-scraper-ui.rw-minimized { width: 175px; height: 46px; min-height: 46px; bottom: 24px !important; right: 24px !important; left: auto !important; top: auto !important; border-radius: 23px; }
        #rw-scraper-ui.rw-minimized #rw-tabs, #rw-scraper-ui.rw-minimized #rw-body, #rw-scraper-ui.rw-minimized .rw-brand, #rw-scraper-ui.rw-minimized .rw-highlight { display: none; }
        #rw-scraper-ui.rw-minimized #rw-header { background: #18181b; padding: 0 12px; height: 100%; border: none; cursor: default; justify-content: space-between; }
        #rw-header { background: linear-gradient(135deg, #6d28d9, #7c3aed); padding: 12px 14px; font-weight: 600; text-align: center; font-size: 16px; letter-spacing: 0.5px; cursor: grab; position: relative; display: flex; justify-content: space-between; align-items: center; }
        #rw-header:active { cursor: grabbing; }
        .rw-title-container { display: flex; align-items: center; gap: 8px; font-size: 14px; }
        .rw-logo { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid #d8b4fe; box-shadow: 0 2px 6px rgba(0,0,0,0.4); flex-shrink: 0; }
        .rw-brand { background: #8c009f; border: 1px solid #5b21b6; padding: 4px 8px; border-radius: 6px; color: #ffffff; font-weight: 700; font-size: 14px; letter-spacing: 0.5px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .rw-highlight { background: #3b0764; border: 1px solid #2e1065; padding: 4px 8px; border-radius: 6px; color: #e9d5ff; }
        .rw-actions { display: flex; gap: 6px; align-items: center; }
        .rw-btn-icon { background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 6px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px; font-weight: bold; transition: all 0.2s ease; line-height: 1; padding: 0; }
        .rw-btn-icon:hover { background: rgba(0,0,0,0.4); }
        #rw-close { background: rgba(239, 68, 68, 0.4); border-color: rgba(239, 68, 68, 0.6); }
        #rw-close:hover { background: rgba(239, 68, 68, 0.9); }
        #rw-tabs { display: flex; border-bottom: 1px solid #3f3f46; background: #27272a; overflow-x: auto; }
        #rw-tabs::-webkit-scrollbar { height: 4px; }
        #rw-tabs::-webkit-scrollbar-track { background: #18181b; }
        #rw-tabs::-webkit-scrollbar-thumb { background: #7c3aed; }
        .rw-tab { flex: 1 1 auto; padding: 10px 12px; white-space: nowrap; background: transparent; border: none; color: #a1a1aa; cursor: pointer; font-weight: 600; font-size: 13px; transition: all 0.2s ease; }
        .rw-tab:hover { color: #e4e4e7; background: rgba(124, 58, 237, 0.1); }
        .rw-tab.active { color: #c4b5fd; border-bottom: 2px solid #7c3aed; background: rgba(124, 58, 237, 0.15); }
        #rw-body { padding: 16px; display: flex; flex-direction: column; gap: 10px; position: relative; min-height: 200px; max-height: 600px; overflow-y: auto; }
        #rw-body::-webkit-scrollbar { width: 6px; }
        #rw-body::-webkit-scrollbar-track { background: #18181b; }
        #rw-body::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 3px; }
        .rw-view { display: none; flex-direction: column; gap: 10px; }
        .rw-view.active { display: flex; }
        .rw-stat { display: flex; justify-content: space-between; align-items: center; font-size: 13px; background: #2e1065; padding: 8px 12px; border-radius: 8px; border: 1px solid #4c1d95; }
        .rw-stat span:first-child { color: #d8b4fe; }
        .rw-stat span:last-child { color: #f3e8ff; font-weight: 700; font-size: 14px; }
        .rw-divider { border: 0; height: 1px; background: #3f3f46; margin: 4px 0; }
        .rw-action-btn { background: #7c3aed; color: white; border: none; padding: 14px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 15px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); margin-top: 5px; box-shadow: 0 0 0 rgba(139, 92, 246, 0); width: 100%; }
        .rw-action-btn:hover:not(:disabled) { background: #8b5cf6; box-shadow: 0 0 15px rgba(139, 92, 246, 0.6), 0 0 25px rgba(139, 92, 246, 0.4); transform: translateY(-1px); }
        .rw-action-btn:active:not(:disabled) { transform: translateY(1px); box-shadow: 0 0 5px rgba(139, 92, 246, 0.4); }
        .rw-action-btn:disabled { background: #27272a; color: #52525b; cursor: not-allowed; transform: none; border: 1px solid #3f3f46; box-shadow: none; }
        .rw-control { display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #a1a1aa; }
        .rw-control-row { display: flex; justify-content: space-between; align-items: center; }
        .rw-input { background: #27272a; border: 1px solid #3f3f46; color: #e4e4e7; padding: 10px; border-radius: 6px; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; width: 100%; box-sizing: border-box; }
        .rw-input:focus { border-color: #7c3aed; }
        .rw-textarea { background: #27272a; border: 1px solid #3f3f46; color: #e4e4e7; padding: 10px; border-radius: 6px; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; width: 100%; box-sizing: border-box; resize: none; height: 120px; }
        .rw-textarea:focus { border-color: #7c3aed; }
        .rw-input-error { border-color: #ef4444 !important; box-shadow: 0 0 8px rgba(239, 68, 68, 0.5) !important; }
        .rw-textarea::-webkit-scrollbar { width: 8px; }
        .rw-textarea::-webkit-scrollbar-track { background: #18181b; border-radius: 4px; }
        .rw-textarea::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 4px; }
        .rw-select { background: #27272a; border: 1px solid #3f3f46; color: #e4e4e7; padding: 10px; border-radius: 6px; outline: none; width: 100%; cursor: pointer; }
        .rw-select:focus { border-color: #7c3aed; }
        .rw-dir-btn { background: #3b0764; color: #e9d5ff; border: 1px solid #7c3aed; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px; transition: background 0.2s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; }
        .rw-dir-btn:hover { background: #4c1d95; }
        #rw-notification { position: absolute; top: 0; left: 0; right: 0; background: rgba(220, 38, 38, 0.95); color: white; padding: 12px; text-align: center; font-size: 13px; font-weight: bold; transform: translateY(-100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 100; box-shadow: 0 4px 12px rgba(0,0,0,0.5); }
        #rw-notification.rw-show { transform: translateY(0); }
        .rw-hidden { display: none !important; }
        .rw-info-box { background: #1f1630; border: 1px solid #4c1d95; border-radius: 8px; padding: 10px 12px; font-size: 12px; color: #d8b4fe; line-height: 1.45; }
        .rw-inline-row { display: flex; gap: 10px; }
        .rw-inline-row > .rw-control { flex: 1; min-width: 0; }
        .rw-option-box { background: #27272a; padding: 10px; border: 1px solid #3f3f46; border-radius: 8px; }
        .rw-option-box label { color: #e4e4e7; font-weight: 600; }
        .rw-asset-list { height: 230px; overflow-y: auto; background: #27272a; border: 1px solid #3f3f46; border-radius: 6px; padding: 6px; display: flex; flex-direction: column; gap: 4px; outline: none; }
        .rw-asset-list::-webkit-scrollbar { width: 8px; }
        .rw-asset-list::-webkit-scrollbar-track { background: #18181b; border-radius: 4px; }
        .rw-asset-list::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 4px; }
        .rw-asset-group { color: #c4b5fd; font-size: 12px; font-weight: 700; padding: 6px 4px 2px; text-transform: uppercase; letter-spacing: 0.4px; }
        .rw-asset-row { display: flex; align-items: center; gap: 10px; padding: 6px 8px; border-radius: 6px; border: 1px solid transparent; cursor: pointer; transition: background 0.15s ease, border-color 0.15s ease; flex-shrink: 0; }
        .rw-asset-row:hover { background: rgba(124, 58, 237, 0.15); border-color: rgba(124, 58, 237, 0.4); }
        .rw-asset-row.rw-selected { background: rgba(124, 58, 237, 0.35); border-color: #9d4edd; }
        .rw-asset-thumb { width: 44px; height: 44px; object-fit: contain; border-radius: 6px; background: #18181b; border: 1px solid #3f3f46; flex-shrink: 0; }
        .rw-asset-thumb.rw-thumb-missing { visibility: hidden; }
        .rw-asset-meta { display: flex; flex-direction: column; min-width: 0; }
        .rw-asset-name { color: #f3e8ff; font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rw-asset-sub { color: #a1a1aa; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rw-asset-empty { color: #71717a; font-size: 12px; text-align: center; padding: 20px 8px; }
        .rw-info-row { display: flex; justify-content: space-between; gap: 12px; }
        .rw-info-row > span:last-child { text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%; }
        .rw-srv-preview { background: #160f24; border: 1px solid #4c1d95; border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; }
        .rw-srv-banner-wrap { width: 100%; aspect-ratio: 16 / 6; background: #0d0914; overflow: hidden; }
        .rw-srv-banner-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .rw-srv-identity { display: flex; align-items: center; gap: 12px; padding: 12px; }
        .rw-srv-icon-img { width: 64px; height: 64px; border-radius: 18px; object-fit: cover; border: 2px solid #7b2cbf; box-shadow: 0 0 12px rgba(123, 44, 191, 0.45); background: #0d0914; flex-shrink: 0; }
        .rw-srv-identity-text { display: flex; flex-direction: column; min-width: 0; gap: 2px; }
        .rw-srv-preview-name { color: #f3e8ff; font-size: 16px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rw-srv-preview-sub { color: #c4b5fd; font-size: 12px; }
        .rw-srv-description { color: #d4d4d8; font-size: 12px; line-height: 1.45; padding: 0 12px 12px; white-space: pre-wrap; max-height: 80px; overflow-y: auto; }
        .rw-srv-splash-row { display: flex; gap: 8px; padding: 0 12px 12px; }
        .rw-srv-splash-fig { flex: 1; margin: 0; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .rw-srv-splash-fig img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 6px; border: 1px solid #3f3f46; background: #0d0914; }
        .rw-srv-splash-fig figcaption { color: #a1a1aa; font-size: 11px; text-align: center; }
        .rw-status { font-size: 12px; text-align: center; padding: 8px; border-radius: 6px; color: #a1a1aa; background: #27272a; border: 1px solid #3f3f46; }
        .rw-status[data-tone="success"] { color: #86efac; border-color: #166534; background: rgba(22, 101, 52, 0.2); }
        .rw-status[data-tone="error"] { color: #fca5a5; border-color: #991b1b; background: rgba(153, 27, 27, 0.2); }
        .rw-btn-row { display: flex; gap: 10px; }
        .rw-btn-row .rw-action-btn { margin-top: 0; }
        .rw-action-btn.rw-secondary-btn { background: #3b0764; border: 1px solid #7c3aed; }
        .rw-action-btn.rw-secondary-btn:hover:not(:disabled) { background: #4c1d95; }
        @keyframes rwButtonGlow { 0%, 100% { box-shadow: 0 0 6px rgba(139, 92, 246, 0.35); } 50% { box-shadow: 0 0 14px rgba(139, 92, 246, 0.65); } }
        .rw-action-btn:not(:disabled) { animation: rwButtonGlow 3s ease-in-out infinite; }
        .rw-action-btn:hover:not(:disabled) { animation: none; }
        #rw-tooltip { position: fixed; z-index: 2147483647; max-width: 260px; background: #0d0914; color: #e0aaff; border: 1px solid #7b2cbf; border-radius: 6px; padding: 6px 10px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 600; line-height: 1.35; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6), 0 0 10px rgba(123, 44, 191, 0.35); pointer-events: none; opacity: 0; transform: translateY(4px); transition: opacity 0.15s ease, transform 0.15s ease; top: -9999px; left: -9999px; }
        #rw-tooltip.rw-tooltip-visible { opacity: 1; transform: translateY(0); }
        .rw-checkbox { width: 18px; height: 18px; accent-color: #7c3aed; cursor: pointer; }
        .rw-checkbox:disabled { opacity: 0.5; cursor: not-allowed; }
        .rw-progress-wrap { background: #27272a; border-radius: 8px; border: 1px solid #3f3f46; overflow: hidden; position: relative; height: 26px; display: none; margin-top: 8px; }
        .rw-progress-wrap.active { display: block; }
        .rw-progress-bar { background: linear-gradient(90deg, #6d28d9, #8b5cf6); height: 100%; width: 0%; transition: width 0.3s ease; }
        .rw-progress-text { position: absolute; top: 0; left: 0; right: 0; text-align: center; font-size: 12px; font-weight: bold; color: white; line-height: 26px; text-shadow: 0 1px 2px rgba(0,0,0,0.8); }
    `;
    document.head.appendChild(style);

    const ui = document.createElement('div');
    ui.id = 'rw-scraper-ui';
    ui.innerHTML = `
        <div id="rw-notification"></div>
        <div id="rw-header">
            <span class="rw-title-container">
                <img class="rw-logo" src="https://cdn.discordapp.com/icons/1459796753896177676/a_f3e67baa7bda99b63f8d71f2b0f9e2df.webp?size=1024&animated=true" alt="Rickware Logo">
                <span class="rw-brand"> Rickware - Labs© </span>
                <span class="rw-highlight"> Discord Asset Scraper v9 </span>
            </span>
            <div class="rw-actions">
                <button id="rw-link-discord" class="rw-btn-icon"><svg width="14" height="14" viewBox="0 0 127.14 96.36"><path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-19.32-72.15ZM42.68,65.36c-5.19,0-9.49-4.78-9.49-10.63s4.2-10.63,9.49-10.63c5.31,0,9.54,4.78,9.49,10.63C52.17,60.58,48,65.36,42.68,65.36Zm41.72,0c-5.19,0-9.49-4.78-9.49-10.63s4.2-10.63,9.49-10.63c5.31,0,9.54,4.78,9.49,10.63C84.4,60.58,80.12,65.36,84.4,65.36Z"/></svg></button>
                <button id="rw-link-web" class="rw-btn-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></button>
                <button id="rw-minimize" class="rw-btn-icon">−</button>
                <button id="rw-maximize" class="rw-btn-icon" style="display:none;">□</button>
                <button id="rw-close" class="rw-btn-icon">×</button>
            </div>
        </div>
        <div id="rw-tabs">
            <button class="rw-tab active" data-target="rw-main" data-tooltip="Shop Scraper: capture assets from Discord Shop pages">Shop</button>
            <button class="rw-tab" data-target="rw-inventory" data-tooltip="Inventory Scraper: download collectibles you own">Inventory</button>
            <button class="rw-tab" data-target="rw-quests" data-tooltip="Quest Scraper: extract collectible quest rewards">Quests</button>
            <button class="rw-tab" data-target="rw-emoji" data-tooltip="Emoji Scraper: single, multiple or server emojis">Emoji</button>
            <button class="rw-tab" data-target="rw-user" data-tooltip="User Scraper: public profile data">User</button>
            <button class="rw-tab" data-target="rw-message" data-tooltip="Message Scraper: export channel messages">Message</button>
            <button class="rw-tab" data-target="rw-server" data-tooltip="Server Scraper: server info and assets">Server</button>
            <button class="rw-tab" data-target="rw-settings" data-tooltip="Settings: folders, delays, opacity and debug">Settings</button>
        </div>
        <div id="rw-body">
            <div id="rw-main" class="rw-view active">
                <div class="rw-stat"><span>Assets Loaded</span><span id="rw-val-loaded">0</span></div>
                <div class="rw-stat"><span>Already Downloaded</span><span id="rw-val-already">0</span></div>
                <div class="rw-stat"><span>Names Resolved</span><span id="rw-val-names">0</span></div>
                <hr class="rw-divider">
                <div class="rw-stat"><span>Total Nameplates</span><span id="rw-tot-nameplates">0</span></div>
                <div class="rw-stat"><span>Total Avatar Decos</span><span id="rw-tot-avatars">0</span></div>
                <div class="rw-stat"><span>Total Profile Decos</span><span id="rw-tot-profiles">0</span></div>
                <div class="rw-stat"><span>Total Profile Frames</span><span id="rw-tot-frames">0</span></div>
                <hr class="rw-divider">
                <div class="rw-stat"><span>Nameplate Assets Downloaded</span><span id="rw-dl-nameplates">0</span></div>
                <div class="rw-stat"><span>Avatar Deco Assets Downloaded</span><span id="rw-dl-avatars">0</span></div>
                <div class="rw-stat"><span>Profile Deco Assets Downloaded</span><span id="rw-dl-profiles">0</span></div>
                <div class="rw-stat"><span>Profile Frame Assets Downloaded</span><span id="rw-dl-frames">0</span></div>
                <div class="rw-control rw-option-box">
                    <div class="rw-control-row">
                        <label>Skip items downloaded in earlier sessions</label>
                        <input type="checkbox" id="rw-shop-skip-known" class="rw-checkbox">
                    </div>
                </div>
                <div id="rw-shop-progress" class="rw-progress-wrap">
                    <div id="rw-shop-progress-bar" class="rw-progress-bar"></div>
                    <div id="rw-shop-progress-text" class="rw-progress-text">0% (0)</div>
                </div>
                <button id="rw-btn" class="rw-action-btn" disabled>Download all items from the loaded page</button>
            </div>

            <div id="rw-inventory" class="rw-view">
                <div class="rw-info-box">Download the assets of collectibles you own, including items that are no longer sold in the shop. Your inventory is loaded once from your own account.</div>
                <div class="rw-inline-row">
                    <div class="rw-control">
                        <label>Mode</label>
                        <select id="rw-inv-mode" class="rw-select">
                            <option value="all">Entire Inventory</option>
                            <option value="single">Single Asset</option>
                        </select>
                    </div>
                    <div class="rw-control">
                        <label>Category</label>
                        <select id="rw-inv-category" class="rw-select">
                            <option value="all">All Categories</option>
                            <option value="avatars">Avatar Decorations</option>
                            <option value="profiles">Profile Effects</option>
                            <option value="frames">Profile Frames</option>
                            <option value="nameplates">Nameplates</option>
                        </select>
                    </div>
                </div>
                <div class="rw-control rw-option-box">
                    <div class="rw-control-row">
                        <label>Only items removed from the shop</label>
                        <input type="checkbox" id="rw-inv-unpublished-only" class="rw-checkbox">
                    </div>
                </div>
                <div id="rw-inv-single-wrap" class="rw-control rw-hidden">
                    <input type="text" id="rw-inv-search" class="rw-input" placeholder="Filter owned assets by name...">
                    <div id="rw-inv-item" class="rw-asset-list" role="listbox" tabindex="0"></div>
                </div>
                <div class="rw-stat"><span>Owned Avatar Decos</span><span id="rw-inv-owned-avatars">0</span></div>
                <div class="rw-stat"><span>Owned Profile Decos</span><span id="rw-inv-owned-profiles">0</span></div>
                <div class="rw-stat"><span>Owned Profile Frames</span><span id="rw-inv-owned-frames">0</span></div>
                <div class="rw-stat"><span>Owned Nameplates</span><span id="rw-inv-owned-nameplates">0</span></div>
                <div class="rw-stat"><span>Removed from Shop</span><span id="rw-inv-unpublished">0</span></div>
                <hr class="rw-divider">
                <div class="rw-stat"><span>Selected for Download</span><span id="rw-inv-selected">0</span></div>
                <div class="rw-stat"><span>Inventory Assets Downloaded</span><span id="rw-inv-downloaded">0</span></div>
                <div id="rw-inv-status" class="rw-status" data-tone="neutral">Inventory not loaded yet.</div>
                <div id="rw-inv-progress" class="rw-progress-wrap">
                    <div id="rw-inv-progress-bar" class="rw-progress-bar"></div>
                    <div id="rw-inv-progress-text" class="rw-progress-text">0% (0)</div>
                </div>
                <div class="rw-btn-row">
                    <button id="rw-inv-load-btn" class="rw-action-btn rw-secondary-btn">Load Inventory</button>
                    <button id="rw-inv-export-btn" class="rw-action-btn rw-secondary-btn" disabled>Export List</button>
                    <button id="rw-inv-dl-btn" class="rw-action-btn" disabled>Download Inventory</button>
                </div>
            </div>

            <div id="rw-quests" class="rw-view">
                <div class="rw-info-box">Extract the collectible rewards of Discord Quests: avatar decorations, profile effects, profile frames and nameplates. Quests are loaded once from your account, then each reward is resolved with a short delay.</div>
                <div class="rw-inline-row">
                    <div class="rw-control">
                        <label>Mode</label>
                        <select id="rw-quest-mode" class="rw-select">
                            <option value="all">All Quest Rewards</option>
                            <option value="single">Single Quest Reward</option>
                        </select>
                    </div>
                    <div class="rw-control">
                        <label>Category</label>
                        <select id="rw-quest-category" class="rw-select">
                            <option value="all">All Categories</option>
                            <option value="avatars">Avatar Decorations</option>
                            <option value="profiles">Profile Effects</option>
                            <option value="frames">Profile Frames</option>
                            <option value="nameplates">Nameplates</option>
                        </select>
                    </div>
                </div>
                <div class="rw-control rw-option-box">
                    <div class="rw-control-row">
                        <label>Only active quests (not expired)</label>
                        <input type="checkbox" id="rw-quest-active-only" class="rw-checkbox">
                    </div>
                </div>
                <div id="rw-quest-single-wrap" class="rw-control rw-hidden">
                    <input type="text" id="rw-quest-search" class="rw-input" placeholder="Filter by reward or quest name...">
                    <div id="rw-quest-item" class="rw-asset-list" role="listbox" tabindex="0"></div>
                </div>
                <div class="rw-stat"><span>Quests Loaded</span><span id="rw-quest-total">0</span></div>
                <div class="rw-stat"><span>Collectible Rewards</span><span id="rw-quest-rewards">0</span></div>
                <div class="rw-stat"><span>Avatar Decos / Profile Decos</span><span id="rw-quest-avatars-profiles">0 / 0</span></div>
                <div class="rw-stat"><span>Profile Frames / Nameplates</span><span id="rw-quest-frames-nameplates">0 / 0</span></div>
                <hr class="rw-divider">
                <div class="rw-stat"><span>Selected for Download</span><span id="rw-quest-selected">0</span></div>
                <div class="rw-stat"><span>Quest Assets Downloaded</span><span id="rw-quest-downloaded">0</span></div>
                <div id="rw-quest-status" class="rw-status" data-tone="neutral">Quests not loaded yet.</div>
                <div id="rw-quest-progress" class="rw-progress-wrap">
                    <div id="rw-quest-progress-bar" class="rw-progress-bar"></div>
                    <div id="rw-quest-progress-text" class="rw-progress-text">0% (0)</div>
                </div>
                <div class="rw-btn-row">
                    <button id="rw-quest-load-btn" class="rw-action-btn rw-secondary-btn">Load Quests</button>
                    <button id="rw-quest-export-btn" class="rw-action-btn rw-secondary-btn" disabled>Export List</button>
                    <button id="rw-quest-dl-btn" class="rw-action-btn" disabled>Download Rewards</button>
                </div>
            </div>

            <div id="rw-emoji" class="rw-view">
                <select id="rw-emoji-mode" class="rw-select">
                    <option value="single">Single Emoji</option>
                    <option value="multiple">Multiple Emojis</option>
                    <option value="server">Entire Server Emojis</option>
                    <option value="stickers">Entire Server Stickers</option>
                </select>
                <div id="rw-emoji-single-wrap">
                    <input type="text" id="rw-emoji-single-id" class="rw-input" placeholder="Enter Single Emoji ID or <a:name:id>">
                </div>
                <div id="rw-emoji-multiple-wrap" class="rw-hidden">
                    <div style="font-size:12px;color:#a1a1aa;margin-bottom:4px;">One Emoji ID or &lt;a:name:id&gt; per line</div>
                    <textarea id="rw-emoji-multiple-ids" class="rw-textarea" placeholder="123456789012345678&#10;<a:pepe:876543210987654321>"></textarea>
                </div>
                <div id="rw-emoji-server-wrap" class="rw-hidden">
                    <input type="text" id="rw-emoji-server-id" class="rw-input" placeholder="Enter Server ID">
                    <div class="rw-stat" style="margin-top:10px;"><span id="rw-emoji-found-label">Emojis Found</span><span id="rw-emoji-found">0</span></div>
                </div>
                <div id="rw-emoji-progress" class="rw-progress-wrap">
                    <div id="rw-emoji-progress-bar" class="rw-progress-bar"></div>
                    <div id="rw-emoji-progress-text" class="rw-progress-text">0% (0)</div>
                </div>
                <button id="rw-emoji-dl-btn" class="rw-action-btn">Download Emojis</button>
            </div>

            <div id="rw-user" class="rw-view">
                <select id="rw-user-mode" class="rw-select">
                    <option value="single">Single User</option>
                    <option value="channel">All from channel</option>
                    <option value="server">Entire Server (Auto)</option>
                    <option value="manual">Entire Server (Manual Scroll)</option>
                </select>
                <div id="rw-user-target-wrap">
                    <input type="text" id="rw-user-target-id" class="rw-input" placeholder="Enter Target ID: (User ID)">
                </div>
                <div id="rw-user-manual-wrap" class="rw-hidden" style="background:#27272a; padding:12px; border:1px solid #3f3f46; border-radius:6px; font-size:12px; color:#e4e4e7; line-height:1.4;">
                    <p style="margin:0 0 8px 0; color:#d8b4fe; font-weight:bold;">Manual Server User Capture</p>
                    <p style="margin:0 0 8px 0;">1. Open the desired server and view the members list.</p>
                    <p style="margin:0 0 8px 0;">2. Click "Start Detection".</p>
                    <p style="margin:0 0 8px 0;">3. Scroll slowly through the members list to the very bottom.</p>
                    <p style="margin:0 0 8px 0;">4. Click "Stop & Download" to save all captured users.</p>
                    <div style="display:flex; gap:10px; margin-top:10px;">
                        <button id="rw-user-start-record" class="rw-action-btn" style="background:#059669; padding:10px; font-size:13px;">Start Detection</button>
                        <button id="rw-user-stop-record" class="rw-action-btn" style="background:#dc2626; padding:10px; font-size:13px;" disabled>Stop & Download</button>
                    </div>
                </div>
                <div class="rw-stat"><span>Users Resolved</span><span id="rw-user-resolved">0</span></div>
                <div id="rw-user-progress" class="rw-progress-wrap">
                    <div id="rw-user-progress-bar" class="rw-progress-bar"></div>
                    <div id="rw-user-progress-text" class="rw-progress-text">0% (0)</div>
                </div>
                <button id="rw-user-dl-btn" class="rw-action-btn">Extract User Data</button>
            </div>

            <div id="rw-message" class="rw-view">
                <select id="rw-message-mode" class="rw-select">
                    <option value="dm">DM Chat</option>
                    <option value="server">Server Chat</option>
                    <option value="group">Group Chat</option>
                    <option value="entire">Entire Server</option>
                </select>
                <input type="text" id="rw-message-target-id" class="rw-input" placeholder="Enter Target ID: (Channel or User ID)">
                <div class="rw-stat"><span>Messages Fetched</span><span id="rw-message-count">0</span></div>
                <div id="rw-message-progress" class="rw-progress-wrap">
                    <div id="rw-message-progress-bar" class="rw-progress-bar"></div>
                    <div id="rw-message-progress-text" class="rw-progress-text">0% (0)</div>
                </div>
                <button id="rw-message-dl-btn" class="rw-action-btn">Scrape Messages</button>
            </div>

            <div id="rw-server" class="rw-view">
                <input type="text" id="rw-server-guild-id" class="rw-input" placeholder="Enter Guild ID">
                <div id="rw-srv-preview" class="rw-srv-preview rw-hidden">
                    <div id="rw-srv-banner-wrap" class="rw-srv-banner-wrap rw-hidden"><img id="rw-srv-banner-img" class="rw-srv-banner-img" alt=""></div>
                    <div class="rw-srv-identity">
                        <img id="rw-srv-icon-img" class="rw-srv-icon-img rw-hidden" alt="">
                        <div class="rw-srv-identity-text">
                            <span id="rw-srv-preview-name" class="rw-srv-preview-name"></span>
                            <span id="rw-srv-preview-sub" class="rw-srv-preview-sub"></span>
                        </div>
                    </div>
                    <div id="rw-srv-description" class="rw-srv-description rw-hidden"></div>
                    <div id="rw-srv-splash-row" class="rw-srv-splash-row rw-hidden">
                        <figure id="rw-srv-splash-fig" class="rw-srv-splash-fig rw-hidden"><img id="rw-srv-splash-img" alt=""><figcaption>Invite Splash</figcaption></figure>
                        <figure id="rw-srv-discovery-fig" class="rw-srv-splash-fig rw-hidden"><img id="rw-srv-discovery-img" alt=""><figcaption>Discovery Splash</figcaption></figure>
                    </div>
                </div>
                <div style="background:#27272a; border:1px solid #3f3f46; border-radius:6px; padding:10px; font-size:13px; color:#e4e4e7; display:flex; flex-direction:column; gap:6px;">
                    <div style="color:#d8b4fe; font-weight:bold; border-bottom:1px solid #3f3f46; padding-bottom:4px;">Server Owner</div>
                    <div style="display:flex; justify-content:space-between;"><span>Username:</span><span id="rw-srv-owner-name">Not Found</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Displayname:</span><span id="rw-srv-owner-disp">Not Found</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>User ID:</span><span id="rw-srv-owner-id">Not Found</span></div>
                    <div class="rw-divider"></div>
                    <div style="display:flex; justify-content:space-between;"><span>Community:</span><span id="rw-srv-community">Not Detected</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Server Picture:</span><span id="rw-srv-pic">Not Found</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Server Banner:</span><span id="rw-srv-banner">Not Found</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Server Name:</span><span id="rw-srv-name">Not Found</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>User Count:</span><span id="rw-srv-users">0</span></div>
                    <div class="rw-info-row"><span>Online Now:</span><span id="rw-srv-online">0</span></div>
                    <div class="rw-info-row"><span>Created:</span><span id="rw-srv-created">Unknown</span></div>
                    <div class="rw-info-row"><span>Boost Level / Boosts:</span><span id="rw-srv-boosts">0 / 0</span></div>
                    <div class="rw-info-row"><span>Vanity URL:</span><span id="rw-srv-vanity">None</span></div>
                    <div class="rw-info-row"><span>Verification / NSFW Level:</span><span id="rw-srv-safety">Unknown</span></div>
                    <div class="rw-info-row"><span>Emojis / Stickers:</span><span id="rw-srv-emoji-sticker">0 / 0</span></div>
                    <div class="rw-info-row"><span>Server Features:</span><span id="rw-srv-features">0</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Bot Count:</span><span id="rw-srv-bots">0</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Server Role Count:</span><span id="rw-srv-roles-cnt">0</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Server Roles:</span><span id="rw-srv-roles-list">Not Found</span></div>
                    <div class="rw-divider"></div>
                    <div style="display:flex; justify-content:space-between;"><span>Categories Found:</span><span id="rw-srv-cat">0</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Text Channels Found:</span><span id="rw-srv-text">0</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Voice Channels Found:</span><span id="rw-srv-voice">0</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>Admin Channels Found:</span><span id="rw-srv-admin">0</span></div>
                </div>
                <button id="rw-server-dl-btn" class="rw-action-btn" style="display:none;">Download Server Assets</button>
            </div>

            <div id="rw-settings" class="rw-view">
                <div class="rw-control">
                    <div class="rw-control-row">
                        <label>Nameplates Save Folder</label>
                        <button id="rw-dir-nameplates" class="rw-dir-btn">Default (ZIP/Browser)</button>
                    </div>
                </div>
                <div class="rw-control">
                    <div class="rw-control-row">
                        <label>Avatar Decos Save Folder</label>
                        <button id="rw-dir-avatars" class="rw-dir-btn">Default (ZIP/Browser)</button>
                    </div>
                </div>
                <div class="rw-control">
                    <div class="rw-control-row">
                        <label>Profile Effects Save Folder</label>
                        <button id="rw-dir-profiles" class="rw-dir-btn">Default (ZIP/Browser)</button>
                    </div>
                </div>
                <div class="rw-control">
                    <div class="rw-control-row">
                        <label>Profile Frames Save Folder</label>
                        <button id="rw-dir-frames" class="rw-dir-btn">Default (ZIP/Browser)</button>
                    </div>
                </div>
                <hr class="rw-divider">
                <div class="rw-control">
                    <div class="rw-control-row">
                        <label>Min Download Delay (ms)</label>
                        <input type="number" id="rw-min-delay" value="400" class="rw-input" style="width:80px; padding:6px;">
                    </div>
                </div>
                <div class="rw-control">
                    <div class="rw-control-row">
                        <label>Max Download Delay (ms)</label>
                        <input type="number" id="rw-max-delay" value="1200" class="rw-input" style="width:80px; padding:6px;">
                    </div>
                </div>
                <div class="rw-control">
                    <div class="rw-control-row"><label>UI Opacity</label><span id="rw-op-val">95%</span></div>
                    <input type="range" id="rw-opacity" min="20" max="100" value="95">
                </div>
                <hr class="rw-divider">
                <div class="rw-control">
                    <div class="rw-control-row">
                        <label style="color:#f87171;font-weight:bold;">Enable Debug Mode (Dev Console)</label>
                        <input type="checkbox" id="rw-debug-mode" class="rw-checkbox">
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(ui);

    let isDebugEnabled = false;
    let interceptedAuthToken = null;
    const apiBaseUrl = `${window.location.origin}/api/v9`;

    if (!window.__rwOriginalConsole) {
        window.__rwOriginalConsole = {
            log: console.log.bind(console),
            warn: console.warn.bind(console),
            error: console.error.bind(console),
            info: console.info.bind(console),
            debug: console.debug.bind(console)
        };
    }

    function shouldSuppressConsoleMessage(args) {
        if (!isDebugEnabled) return false;
        try {
            for (let index = 0; index < args.length; index++) {
                const currentArg = args[index];
                if (typeof currentArg === 'string') {
                    if (
                        currentArg.includes('NowPlayingViewStore') ||
                        currentArg.includes('Unknown type for applicationId')
                    ) {
                        return true;
                    }
                } else if (currentArg && typeof currentArg === 'object') {
                    const serializedText = String(currentArg.message || currentArg.stack || '');
                    if (
                        serializedText.includes('NowPlayingViewStore') ||
                        serializedText.includes('Unknown type for applicationId')
                    ) {
                        return true;
                    }
                }
            }
        } catch (err) {}
        return false;
    }

    function applyConsoleFilterHooks() {
        try {
            ['log', 'warn', 'error', 'info', 'debug'].forEach(methodName => {
                console[methodName] = function(...args) {
                    if (shouldSuppressConsoleMessage(args)) return;
                    return window.__rwOriginalConsole[methodName](...args);
                };
            });
        } catch (err) {}
    }

    function restoreOriginalConsole() {
        try {
            if (!window.__rwOriginalConsole) return;
            ['log', 'warn', 'error', 'info', 'debug'].forEach(methodName => {
                if (window.__rwOriginalConsole[methodName]) {
                    console[methodName] = window.__rwOriginalConsole[methodName];
                }
            });
        } catch (err) {}
    }

    applyConsoleFilterHooks();

    document.getElementById('rw-debug-mode').addEventListener('change', (event) => {
        isDebugEnabled = event.target.checked;
        if (isDebugEnabled) {
            window.__rwOriginalConsole.log("[Rw-Labs Asset Scraper] Debug Mode Enabled.");
        }
        persistSettings();
    });

    function rwError(message, errorObj) {
        if (!isDebugEnabled) return;
        window.__rwOriginalConsole.error(`[Rw-Labs Asset Scraper] ${message}`, errorObj);
    }

    const forwardedClientHeaderNames = ['x-super-properties', 'x-discord-locale', 'x-discord-timezone', 'x-debug-options'];
    const capturedClientHeaders = Object.assign({}, window.__rwCapturedClientHeaders || {});

    function buildClientRequestHeaders(token) {
        const requestHeaders = {};
        forwardedClientHeaderNames.forEach(headerName => {
            if (capturedClientHeaders[headerName]) requestHeaders[headerName] = capturedClientHeaders[headerName];
        });
        try {
            if (!requestHeaders['x-discord-locale'] && navigator.language) requestHeaders['x-discord-locale'] = navigator.language;
            if (!requestHeaders['x-discord-timezone']) {
                const resolvedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (resolvedTimeZone) requestHeaders['x-discord-timezone'] = resolvedTimeZone;
            }
        } catch (err) {}
        requestHeaders['Authorization'] = token;
        return requestHeaders;
    }

    function captureClientHeader(headerName, headerValue) {
        const normalizedHeaderName = typeof headerName === 'string' ? headerName.toLowerCase() : '';
        if (normalizedHeaderName === 'authorization' && typeof headerValue === 'string' && headerValue.length > 30) {
            interceptedAuthToken = headerValue;
        }
        if (forwardedClientHeaderNames.includes(normalizedHeaderName) && typeof headerValue === 'string' && headerValue.length > 0 && headerValue.length <= 4096) {
            capturedClientHeaders[normalizedHeaderName] = headerValue;
            window.__rwCapturedClientHeaders = capturedClientHeaders;
        }
    }

    function captureClientHeadersFromFetch(requestResource, requestInit) {
        const requestUrl = typeof requestResource === 'string' ? requestResource : (requestResource && requestResource.url) || '';
        if (!String(requestUrl).includes('/api/')) return;
        const headerSources = [requestResource && typeof requestResource === 'object' ? requestResource.headers : null, requestInit ? requestInit.headers : null];
        headerSources.forEach(headerSource => {
            if (!headerSource) return;
            if (typeof Headers !== 'undefined' && headerSource instanceof Headers) {
                headerSource.forEach((headerValue, headerName) => captureClientHeader(headerName, headerValue));
            } else if (Array.isArray(headerSource)) {
                headerSource.forEach(headerPair => { if (Array.isArray(headerPair)) captureClientHeader(headerPair[0], headerPair[1]); });
            } else if (typeof headerSource === 'object') {
                Object.keys(headerSource).forEach(headerName => captureClientHeader(headerName, headerSource[headerName]));
            }
        });
    }

    try {
        if (!window.__rwOriginalFetch) window.__rwOriginalFetch = window.fetch;
        const originalFetch = window.__rwOriginalFetch;
        window.fetch = function(requestResource, requestInit) {
            try {
                captureClientHeadersFromFetch(requestResource, requestInit);
            } catch (err) {}
            return originalFetch.apply(this, arguments);
        };
    } catch (err) {
        rwError("Fetch header hook failed", err);
    }

    try {
        if (!window.__rwOriginalSetRequestHeader) window.__rwOriginalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
        const originalSetRequestHeader = window.__rwOriginalSetRequestHeader;
        XMLHttpRequest.prototype.setRequestHeader = function(headerName, headerValue) {
            try {
                captureClientHeader(headerName, headerValue);
            } catch (err) {}
            return originalSetRequestHeader.apply(this, arguments);
        };
    } catch (err) {
        rwError("XHR header hook failed", err);
    }

    class LabsZip {
        constructor() {
            this.files = [];
            this.crcTable = this.makeCrcTable();
        }
        addFile(fileName, uint8Array) {
            this.files.push({ name: fileName, data: uint8Array });
        }
        makeCrcTable() {
            let crcValue;
            const crcTable = [];
            for (let index = 0; index < 256; index++) {
                crcValue = index;
                for (let bitIndex = 0; bitIndex < 8; bitIndex++) {
                    crcValue = ((crcValue & 1) ? (0xEDB88320 ^ (crcValue >>> 1)) : (crcValue >>> 1));
                }
                crcTable[index] = crcValue;
            }
            return crcTable;
        }
        crc32(uint8Array) {
            let crc = 0 ^ (-1);
            for (let index = 0; index < uint8Array.length; index++) {
                crc = (crc >>> 8) ^ this.crcTable[(crc ^ uint8Array[index]) & 0xFF];
            }
            return (crc ^ (-1)) >>> 0;
        }
        generate() {
            const buffers = [];
            const centralDirectory = [];
            let offset = 0;
            const textEncoder = new TextEncoder();
            for (const file of this.files) {
                const nameBuffer = textEncoder.encode(file.name);
                const dataBuffer = file.data;
                const crc = this.crc32(dataBuffer);
                const size = dataBuffer.length;
                const localFileHeader = new ArrayBuffer(30 + nameBuffer.length);
                const localHeaderView = new DataView(localFileHeader);
                localHeaderView.setUint32(0, 0x04034b50, true);
                localHeaderView.setUint16(4, 10, true);
                localHeaderView.setUint16(6, 0, true);
                localHeaderView.setUint16(8, 0, true);
                localHeaderView.setUint16(10, 0, true);
                localHeaderView.setUint16(12, 0, true);
                localHeaderView.setUint32(14, crc, true);
                localHeaderView.setUint32(18, size, true);
                localHeaderView.setUint32(22, size, true);
                localHeaderView.setUint16(26, nameBuffer.length, true);
                localHeaderView.setUint16(28, 0, true);
                new Uint8Array(localFileHeader).set(nameBuffer, 30);
                buffers.push(new Uint8Array(localFileHeader));
                buffers.push(dataBuffer);
                const centralDirHeader = new ArrayBuffer(46 + nameBuffer.length);
                const centralDirView = new DataView(centralDirHeader);
                centralDirView.setUint32(0, 0x02014b50, true);
                centralDirView.setUint16(4, 10, true);
                centralDirView.setUint16(6, 10, true);
                centralDirView.setUint16(8, 0, true);
                centralDirView.setUint16(10, 0, true);
                centralDirView.setUint16(12, 0, true);
                centralDirView.setUint16(14, 0, true);
                centralDirView.setUint32(16, crc, true);
                centralDirView.setUint32(20, size, true);
                centralDirView.setUint32(24, size, true);
                centralDirView.setUint16(28, nameBuffer.length, true);
                centralDirView.setUint16(30, 0, true);
                centralDirView.setUint16(32, 0, true);
                centralDirView.setUint16(34, 0, true);
                centralDirView.setUint16(36, 0, true);
                centralDirView.setUint32(38, 0, true);
                centralDirView.setUint32(42, offset, true);
                new Uint8Array(centralDirHeader).set(nameBuffer, 46);
                centralDirectory.push(new Uint8Array(centralDirHeader));
                offset += localFileHeader.byteLength + dataBuffer.byteLength;
            }
            let centralDirSize = 0;
            for (const dirEntry of centralDirectory) centralDirSize += dirEntry.byteLength;
            const endOfCentralDir = new ArrayBuffer(22);
            const endOfCentralView = new DataView(endOfCentralDir);
            endOfCentralView.setUint32(0, 0x06054b50, true);
            endOfCentralView.setUint16(4, 0, true);
            endOfCentralView.setUint16(6, 0, true);
            endOfCentralView.setUint16(8, this.files.length, true);
            endOfCentralView.setUint16(10, this.files.length, true);
            endOfCentralView.setUint32(12, centralDirSize, true);
            endOfCentralView.setUint32(16, offset, true);
            endOfCentralView.setUint16(20, 0, true);
            const totalLength = offset + centralDirSize + endOfCentralDir.byteLength;
            const finalZip = new Uint8Array(totalLength);
            let writeOffset = 0;
            for (const bufferChunk of buffers) {
                finalZip.set(bufferChunk, writeOffset);
                writeOffset += bufferChunk.length;
            }
            for (const dirEntry of centralDirectory) {
                finalZip.set(dirEntry, writeOffset);
                writeOffset += dirEntry.length;
            }
            finalZip.set(new Uint8Array(endOfCentralDir), writeOffset);
            return new Blob([finalZip], { type: 'application/zip' });
        }
    }

    function hasOwnOrProtoMethods(targetObj, requiredMethods) {
        if (!targetObj || (typeof targetObj !== 'object' && typeof targetObj !== 'function')) return false;
        try {
            const ownNames = Object.getOwnPropertyNames(targetObj);
            const prototypeObj = Object.getPrototypeOf(targetObj);
            const protoNames = (prototypeObj && prototypeObj !== Object.prototype) ? Object.getOwnPropertyNames(prototypeObj) : [];
            for (const methodName of requiredMethods) {
                const inOwn = ownNames.includes(methodName) && typeof Object.getOwnPropertyDescriptor(targetObj, methodName)?.value === 'function';
                const inProto = protoNames.includes(methodName) && typeof Object.getOwnPropertyDescriptor(prototypeObj, methodName)?.value === 'function';
                if (!inOwn && !inProto) return false;
            }
            return true;
        } catch (err) {
            return false;
        }
    }

    function getDiscordWebpackStores() {
        const stores = {
            tokenStore: null,
            userStore: null,
            guildMemberStore: null,
            guildStore: null,
            channelStore: null,
            emojiStore: null,
            presenceStore: null,
            relationshipStore: null
        };
        try {
            if (typeof window === 'undefined' || !window.webpackChunkdiscord_app) return stores;
            window.webpackChunkdiscord_app.push([
                [Symbol('rw_labs_probe')],
                {},
                (webpackRequire) => {
                    if (!webpackRequire || !webpackRequire.c) return;
                    for (const moduleKey of Object.keys(webpackRequire.c)) {
                        try {
                            const moduleEntry = webpackRequire.c[moduleKey];
                            if (!moduleEntry || !moduleEntry.exports) continue;
                            const exportsObj = moduleEntry.exports;
                            const candidates = [exportsObj, exportsObj.default, exportsObj.Z, exportsObj.ZP];
                            for (const candidate of candidates) {
                                if (!candidate) continue;
                                if (!stores.tokenStore && hasOwnOrProtoMethods(candidate, ['getToken', 'getId'])) {
                                    stores.tokenStore = candidate;
                                }
                                if (!stores.userStore && hasOwnOrProtoMethods(candidate, ['getUser', 'getCurrentUser'])) {
                                    stores.userStore = candidate;
                                }
                                if (!stores.guildMemberStore && hasOwnOrProtoMethods(candidate, ['getMembers', 'getMember'])) {
                                    stores.guildMemberStore = candidate;
                                }
                                if (!stores.guildStore && hasOwnOrProtoMethods(candidate, ['getGuild', 'getGuilds'])) {
                                    stores.guildStore = candidate;
                                }
                                if (!stores.channelStore && hasOwnOrProtoMethods(candidate, ['getChannel', 'getDMFromUserId'])) {
                                    stores.channelStore = candidate;
                                }
                                if (!stores.emojiStore && hasOwnOrProtoMethods(candidate, ['getGuildEmoji'])) {
                                    stores.emojiStore = candidate;
                                }
                                if (!stores.presenceStore && hasOwnOrProtoMethods(candidate, ['getActivities', 'getState'])) {
                                    stores.presenceStore = candidate;
                                }
                                if (!stores.relationshipStore && hasOwnOrProtoMethods(candidate, ['isFriend', 'getSince'])) {
                                    stores.relationshipStore = candidate;
                                }
                            }
                        } catch (innerErr) {}
                    }
                }
            ]);
            window.webpackChunkdiscord_app.pop();
        } catch (err) {
            rwError("Webpack store extraction failed", err);
        }
        return stores;
    }

    function getDiscordToken() {
        try {
            if (interceptedAuthToken && interceptedAuthToken.length > 30) return interceptedAuthToken;
            const stores = getDiscordWebpackStores();
            if (stores.tokenStore) {
                const storeToken = stores.tokenStore.getToken();
                if (typeof storeToken === 'string' && storeToken.length > 30) {
                    interceptedAuthToken = storeToken;
                    return storeToken;
                }
            }
            try {
                const tempIframe = document.createElement('iframe');
                tempIframe.style.display = 'none';
                document.body.appendChild(tempIframe);
                const rawToken = tempIframe.contentWindow?.localStorage?.getItem('token');
                tempIframe.remove();
                if (rawToken) {
                    const cleanedToken = rawToken.replace(/^"+|"+$/g, '');
                    if (cleanedToken.length > 30) {
                        interceptedAuthToken = cleanedToken;
                        return cleanedToken;
                    }
                }
            } catch (storageErr) {}
            if (typeof window.localStorage !== 'undefined') {
                const directToken = window.localStorage.getItem('token');
                if (directToken) {
                    const cleanedDirect = directToken.replace(/^"+|"+$/g, '');
                    if (cleanedDirect.length > 30) {
                        interceptedAuthToken = cleanedDirect;
                        return cleanedDirect;
                    }
                }
            }
            return null;
        } catch (err) {
            return null;
        }
    }

    function setInputValidationState(inputElement, isValid) {
        if (!inputElement) return false;
        if (isValid) {
            inputElement.classList.remove('rw-input-error');
            return true;
        } else {
            inputElement.classList.add('rw-input-error');
            return false;
        }
    }

    function extractSnowflakeId(rawInput) {
        if (!rawInput || typeof rawInput !== 'string') return null;
        const trimmed = rawInput.trim();
        const urlChannelMatch = trimmed.match(/channels\/(?:@me|\d{15,22})\/(\d{15,22})/);
        if (urlChannelMatch) return urlChannelMatch[1];
        const snowflakeMatches = trimmed.match(/\d{15,22}/g);
        if (snowflakeMatches && snowflakeMatches.length > 0) return snowflakeMatches[snowflakeMatches.length - 1];
        return null;
    }

    function triggerDirectDownload(blob, fileName) {
        try {
            const blobUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = fileName;
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            setTimeout(() => {
                downloadLink.remove();
                URL.revokeObjectURL(blobUrl);
            }, 3000);
            return true;
        } catch (err) {
            return false;
        }
    }

    async function saveOutputFile(blob, fileName, optionalDirHandle = null) {
        if (optionalDirHandle) {
            try {
                const fileHandle = await optionalDirHandle.getFileHandle(fileName, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(blob);
                await writable.close();
                return true;
            } catch (err) {
                rwError("Directory handle write failed", err);
            }
        }
        return triggerDirectDownload(blob, fileName);
    }

    const collectedAssets = new Map();
    const sessionDownloaded = new Set();
    let nameCount = 0;
    let lastShopHref = '';
    const dlStats = { nameplates: 0, avatars: 0, profiles: 0, frames: 0 };
    let alreadyDlCount = 0;
    const dirHandles = { nameplates: null, avatars: null, profiles: null, frames: null };

    const el = {
        loaded: document.getElementById('rw-val-loaded'),
        already: document.getElementById('rw-val-already'),
        names: document.getElementById('rw-val-names'),
        totNameplates: document.getElementById('rw-tot-nameplates'),
        totAvatars: document.getElementById('rw-tot-avatars'),
        totProfiles: document.getElementById('rw-tot-profiles'),
        totFrames: document.getElementById('rw-tot-frames'),
        dlNameplates: document.getElementById('rw-dl-nameplates'),
        dlAvatars: document.getElementById('rw-dl-avatars'),
        dlProfiles: document.getElementById('rw-dl-profiles'),
        dlFrames: document.getElementById('rw-dl-frames'),
        btn: document.getElementById('rw-btn'),
        header: document.getElementById('rw-header'),
        closeBtn: document.getElementById('rw-close'),
        minBtn: document.getElementById('rw-minimize'),
        maxBtn: document.getElementById('rw-maximize'),
        opacity: document.getElementById('rw-opacity'),
        opacityVal: document.getElementById('rw-op-val'),
        minDelay: document.getElementById('rw-min-delay'),
        maxDelay: document.getElementById('rw-max-delay'),
        linkDiscord: document.getElementById('rw-link-discord'),
        linkWeb: document.getElementById('rw-link-web'),
        noti: document.getElementById('rw-notification')
    };

    let notiTimeout;
    function showNotification(message, isSuccess = false) {
        el.noti.innerText = message;
        el.noti.style.background = isSuccess ? 'rgba(22, 163, 74, 0.95)' : 'rgba(220, 38, 38, 0.95)';
        el.noti.classList.add('rw-show');
        clearTimeout(notiTimeout);
        notiTimeout = setTimeout(() => {
            el.noti.classList.remove('rw-show');
        }, 6000);
    }

    function updateProgressBar(idPrefix, percentage, textString) {
        const wrap = document.getElementById(`${idPrefix}-progress`);
        const bar = document.getElementById(`${idPrefix}-progress-bar`);
        const text = document.getElementById(`${idPrefix}-progress-text`);
        if (wrap && bar && text) {
            wrap.classList.add('active');
            bar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
            text.innerText = textString;
        }
    }

    function hideProgressBar(idPrefix) {
        const wrap = document.getElementById(`${idPrefix}-progress`);
        if (wrap) wrap.classList.remove('active');
    }

    const settingsStorageKey = 'rw_labs_asset_scraper_settings';
    const settingsStorageFrame = document.createElement('iframe');
    settingsStorageFrame.style.display = 'none';
    settingsStorageFrame.setAttribute('aria-hidden', 'true');
    document.body.appendChild(settingsStorageFrame);

    function getSettingsStorage() {
        try {
            if (settingsStorageFrame.contentWindow && settingsStorageFrame.contentWindow.localStorage) return settingsStorageFrame.contentWindow.localStorage;
        } catch (storageErr) {
            rwError("Settings storage unavailable", storageErr);
        }
        return null;
    }

    function readPersistedSettings() {
        try {
            const settingsStorage = getSettingsStorage();
            const rawSettings = settingsStorage ? settingsStorage.getItem(settingsStorageKey) : null;
            const parsedSettings = rawSettings ? JSON.parse(rawSettings) : {};
            return parsedSettings && typeof parsedSettings === 'object' ? parsedSettings : {};
        } catch (err) {
            rwError("Settings could not be read", err);
            return {};
        }
    }

    function persistSettings() {
        try {
            const settingsStorage = getSettingsStorage();
            if (!settingsStorage) return;
            const minDelayValue = parseInt(el.minDelay.value, 10);
            const maxDelayValue = parseInt(el.maxDelay.value, 10);
            settingsStorage.setItem(settingsStorageKey, JSON.stringify({
                min_delay_ms: Number.isFinite(minDelayValue) ? minDelayValue : 400,
                max_delay_ms: Number.isFinite(maxDelayValue) ? maxDelayValue : 1200,
                ui_opacity: parseInt(el.opacity.value, 10) || 95,
                debug_mode: Boolean(document.getElementById('rw-debug-mode').checked),
                skip_previous_downloads: Boolean(document.getElementById('rw-shop-skip-known').checked)
            }));
        } catch (err) {
            rwError("Settings could not be saved", err);
        }
    }

    function applyPersistedSettings() {
        const persistedSettings = readPersistedSettings();
        const isValidDelay = delayValue => Number.isInteger(delayValue) && delayValue >= 0 && delayValue <= 60000;
        if (isValidDelay(persistedSettings.min_delay_ms)) el.minDelay.value = persistedSettings.min_delay_ms;
        if (isValidDelay(persistedSettings.max_delay_ms)) el.maxDelay.value = persistedSettings.max_delay_ms;
        if (Number.isInteger(persistedSettings.ui_opacity) && persistedSettings.ui_opacity >= 20 && persistedSettings.ui_opacity <= 100) {
            el.opacity.value = persistedSettings.ui_opacity;
            ui.style.opacity = persistedSettings.ui_opacity / 100;
            el.opacityVal.innerText = `${persistedSettings.ui_opacity}%`;
        }
        if (persistedSettings.debug_mode === true) {
            document.getElementById('rw-debug-mode').checked = true;
            isDebugEnabled = true;
        }
        if (persistedSettings.skip_previous_downloads === true) {
            document.getElementById('rw-shop-skip-known').checked = true;
        }
    }

    const downloadHistoryStorageKey = 'rw_labs_downloaded_asset_keys';
    const downloadHistoryLimit = 10000;

    function readDownloadHistory() {
        try {
            const settingsStorage = getSettingsStorage();
            const rawHistory = settingsStorage ? settingsStorage.getItem(downloadHistoryStorageKey) : null;
            const parsedHistory = rawHistory ? JSON.parse(rawHistory) : [];
            return Array.isArray(parsedHistory) ? parsedHistory.filter(historyKey => typeof historyKey === 'string') : [];
        } catch (err) {
            rwError("Download history could not be read", err);
            return [];
        }
    }

    const persistentDownloadHistory = new Set(readDownloadHistory());

    function persistDownloadHistory() {
        try {
            const settingsStorage = getSettingsStorage();
            if (!settingsStorage) return;
            settingsStorage.setItem(downloadHistoryStorageKey, JSON.stringify(Array.from(persistentDownloadHistory).slice(-downloadHistoryLimit)));
        } catch (err) {
            rwError("Download history could not be saved", err);
        }
    }

    document.getElementById('rw-shop-skip-known').addEventListener('change', persistSettings);

    const tooltipNode = document.createElement('div');
    tooltipNode.id = 'rw-tooltip';
    document.body.appendChild(tooltipNode);

    const buttonTooltipTexts = {
        'rw-link-discord': 'Join the Rickware Labs Discord server',
        'rw-link-web': 'Open the Rickware Labs launcher website',
        'rw-minimize': 'Minimize the scraper window',
        'rw-maximize': 'Restore the scraper window',
        'rw-close': 'Close the scraper and stop all background tasks',
        'rw-btn': 'Download every asset detected on the current shop page',
        'rw-inv-load-btn': 'Load the collectibles you own from your account',
        'rw-inv-dl-btn': 'Download the selected owned assets',
        'rw-inv-export-btn': 'Export your owned asset list as JSON',
        'rw-quest-load-btn': 'Load current quests and resolve their collectible rewards',
        'rw-quest-export-btn': 'Export the quest reward list as JSON',
        'rw-quest-dl-btn': 'Download the selected quest reward assets',
        'rw-emoji-dl-btn': 'Download the emojis for the selected mode',
        'rw-user-dl-btn': 'Extract public profile data for the target',
        'rw-user-start-record': 'Start capturing members while you scroll the member list',
        'rw-user-stop-record': 'Stop capturing and download the captured users',
        'rw-message-dl-btn': 'Export the messages of the target channel',
        'rw-server-dl-btn': 'Download icon, banner, splash and server info',
        'rw-dir-nameplates': 'Choose a folder for nameplate downloads',
        'rw-dir-avatars': 'Choose a folder for avatar decoration downloads',
        'rw-dir-profiles': 'Choose a folder for profile effect downloads',
        'rw-dir-frames': 'Choose a folder for profile frame downloads'
    };
    Object.entries(buttonTooltipTexts).forEach(([buttonId, tooltipText]) => {
        const buttonNode = document.getElementById(buttonId);
        if (buttonNode) buttonNode.setAttribute('data-tooltip', tooltipText);
    });

    function showTooltipFor(targetNode) {
        const tooltipText = targetNode.getAttribute('data-tooltip');
        if (!tooltipText) return;
        tooltipNode.textContent = tooltipText;
        tooltipNode.classList.add('rw-tooltip-visible');
        const targetRect = targetNode.getBoundingClientRect();
        const tooltipRect = tooltipNode.getBoundingClientRect();
        const preferredTop = targetRect.top - tooltipRect.height - 8;
        const tooltipTop = preferredTop < 4 ? targetRect.bottom + 8 : preferredTop;
        const tooltipLeft = Math.min(window.innerWidth - tooltipRect.width - 4, Math.max(4, targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2)));
        tooltipNode.style.top = `${tooltipTop}px`;
        tooltipNode.style.left = `${tooltipLeft}px`;
    }

    ui.addEventListener('mouseover', (event) => {
        const tooltipTarget = event.target.closest('[data-tooltip]');
        if (tooltipTarget && ui.contains(tooltipTarget)) showTooltipFor(tooltipTarget);
    });
    ui.addEventListener('mouseout', (event) => {
        const tooltipTarget = event.target.closest('[data-tooltip]');
        if (!tooltipTarget || (event.relatedTarget && tooltipTarget.contains(event.relatedTarget))) return;
        tooltipNode.classList.remove('rw-tooltip-visible');
    });
    ui.addEventListener('mousedown', () => tooltipNode.classList.remove('rw-tooltip-visible'));

    el.linkDiscord.addEventListener('click', () => window.open('https://discord.gg/Rw-Labs', '_blank'));
    el.linkWeb.addEventListener('click', () => window.open('https://rickware-labs-official.github.io/Launcher/', '_blank'));

    async function pickDirectory(categoryType, buttonId) {
        try {
            if (typeof window.showDirectoryPicker !== 'function') {
                showNotification("Folder Picker unsupported in Client; using automatic ZIP download.", true);
                return;
            }
            const handle = await window.showDirectoryPicker({ mode: 'readwrite' });
            dirHandles[categoryType] = handle;
            document.getElementById(buttonId).innerText = handle.name;
            showNotification(`Folder set: ${handle.name}`, true);
        } catch (err) {
            showNotification("Using automatic ZIP/Browser download mode.", true);
        }
    }

    document.getElementById('rw-dir-nameplates').addEventListener('click', () => pickDirectory('nameplates', 'rw-dir-nameplates'));
    document.getElementById('rw-dir-avatars').addEventListener('click', () => pickDirectory('avatars', 'rw-dir-avatars'));
    document.getElementById('rw-dir-profiles').addEventListener('click', () => pickDirectory('profiles', 'rw-dir-profiles'));
    document.getElementById('rw-dir-frames').addEventListener('click', () => pickDirectory('frames', 'rw-dir-frames'));

    document.querySelectorAll('.rw-tab').forEach(tabButton => {
        tabButton.addEventListener('click', (event) => {
            document.querySelectorAll('.rw-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.rw-view').forEach(view => view.classList.remove('active'));
            event.target.classList.add('active');
            document.getElementById(event.target.getAttribute('data-target')).classList.add('active');
        });
    });

    el.opacity.addEventListener('input', (event) => {
        ui.style.opacity = event.target.value / 100;
        el.opacityVal.innerText = `${event.target.value}%`;
        persistSettings();
    });

    [el.minDelay, el.maxDelay].forEach(delayInput => {
        delayInput.addEventListener('input', () => {
            const parsedVal = parseInt(delayInput.value, 10);
            const isDelayValid = setInputValidationState(delayInput, !isNaN(parsedVal) && parsedVal >= 0 && parsedVal <= 60000);
            if (isDelayValid) persistSettings();
        });
    });

    applyPersistedSettings();

    el.minBtn.addEventListener('click', () => {
        ui.style.left = '';
        ui.style.top = '';
        ui.style.right = '';
        ui.style.bottom = '';
        ui.classList.add('rw-minimized');
        el.minBtn.style.display = 'none';
        el.maxBtn.style.display = 'flex';
    });

    el.maxBtn.addEventListener('click', () => {
        ui.classList.remove('rw-minimized');
        el.maxBtn.style.display = 'none';
        el.minBtn.style.display = 'flex';
    });

    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    el.header.addEventListener('mousedown', (event) => {
        if (ui.classList.contains('rw-minimized')) return;
        if (event.target.closest('.rw-actions')) return;
        isDragging = true;
        dragOffsetX = event.clientX - ui.getBoundingClientRect().left;
        dragOffsetY = event.clientY - ui.getBoundingClientRect().top;
    });

    function handleWindowDragMove(event) {
        if (!isDragging) return;
        const maxLeft = Math.max(0, window.innerWidth - ui.offsetWidth);
        const maxTop = Math.max(0, window.innerHeight - 48);
        ui.style.bottom = 'auto';
        ui.style.right = 'auto';
        ui.style.left = `${Math.min(maxLeft, Math.max(0, event.clientX - dragOffsetX))}px`;
        ui.style.top = `${Math.min(maxTop, Math.max(0, event.clientY - dragOffsetY))}px`;
    }

    function handleWindowDragEnd() {
        isDragging = false;
    }

    document.addEventListener('mousemove', handleWindowDragMove);
    document.addEventListener('mouseup', handleWindowDragEnd);

    function cleanString(inputStr) {
        return String(inputStr || '').replace(/[<>:"/\\|?*\n\r]/g, '_').trim();
    }

    function getSafeFileName(inputStr) {
        return String(inputStr || '').replace(/[\\/:*?"<>|\n\r]/g, '_').trim() || 'Unknown_Item';
    }

    const shopKeywords = {
        avatars: ["avatar decoration", "avatar-dekoration", "décoration d'avatar", "decoración de avatar", "decorazione avatar", "decoração de avatar", "аватар", "dekoracje awatara", "avatar-decoratie", "avatar"],
        profiles: ["profile effect", "profil-effekt", "effet de profil", "efecto de perfil", "effetto profilo", "efeito de perfil", "эффект профиля", "efekty profilu", "profielframe", "profile"],
        frames: ["profile frame", "profil-rahmen", "cadre de profil", "marco de perfil", "cornice profilo", "moldura de perfil", "рамка профиля", "ramki profilu", "frame"],
        nameplates: ["nameplate", "namensschild", "placa", "plaque", "targhetta", "placa de identificação", "табличка", "plakietka", "naamplaatje"]
    };

    function extractTotals() {
        const elements = document.querySelectorAll('div, span, h1, h2, h3, li, button');
        const textValues = new Set();
        elements.forEach(domNode => {
            if (domNode.closest('#rw-scraper-ui')) return;
            const textContent = domNode.textContent.trim();
            if (domNode.children.length === 0 && textContent.length > 0 && textContent.length < 45) {
                textValues.add(textContent);
            }
        });

        const foundTotalCategories = new Set();
        for (const textItem of textValues) {
            const lowerTxt = textItem.toLowerCase();
            if (lowerTxt.includes('buy') || lowerTxt.includes('gift') || lowerTxt.includes('kaufen') || lowerTxt.includes('$') || lowerTxt.includes('€')) continue;
            const numberMatch = textItem.match(/(?:^|\s|\()(\d+)(?:\s|\)|$)/);
            if (!numberMatch) continue;
            const countNum = numberMatch[1];
            if (shopKeywords.nameplates.some(kw => lowerTxt.includes(kw))) {
                el.totNameplates.innerText = countNum;
                foundTotalCategories.add('nameplates');
            } else if (shopKeywords.frames.some(kw => lowerTxt.includes(kw))) {
                el.totFrames.innerText = countNum;
                foundTotalCategories.add('frames');
            } else if (shopKeywords.avatars.some(kw => lowerTxt.includes(kw))) {
                el.totAvatars.innerText = countNum;
                foundTotalCategories.add('avatars');
            } else if (shopKeywords.profiles.some(kw => lowerTxt.includes(kw))) {
                el.totProfiles.innerText = countNum;
                foundTotalCategories.add('profiles');
            }
        }
        return foundTotalCategories;
    }

    function isExcludedShopElement(element) {
        if (!element) return true;
        if (element.closest('#rw-scraper-ui, nav, aside, header')) return true;
        if (element.closest('[data-testid="collectibles-shop-product-card"]')) return false;
        if (element.closest('[class*="sidebar"], [class*="panels"], [class*="privateChannels"], [class*="guilds"], [class*="hero"], [class*="featuredBlock"], [class*="categoryBanner"], [class*="shopBanner"], [class*="bannerHeader"]')) {
            return true;
        }
        return false;
    }

    function findShopCardContainer(mediaElement) {
        const productTestCard = mediaElement.closest('[data-testid="collectibles-shop-product-card"]');
        if (productTestCard && !isExcludedShopElement(productTestCard)) return productTestCard;
        const directCard = mediaElement.closest('[class*="shopCard"], [class*="productCard"], [class*="itemCard"], [class*="collectibleCard"], article');
        if (directCard && !isExcludedShopElement(directCard)) return directCard;

        let currentElement = mediaElement.parentElement;
        while (currentElement && currentElement !== document.body) {
            if (isExcludedShopElement(currentElement)) return null;
            const classNameStr = typeof currentElement.className === 'string' ? currentElement.className : '';
            if (
                /(?:^|\s)(?:shopCard|productCard|card_|shopItem|catalogCard)/i.test(classNameStr) ||
                (currentElement.getAttribute('role') === 'button' && currentElement.parentElement && currentElement.parentElement.children.length >= 3)
            ) {
                const rect = currentElement.getBoundingClientRect();
                if (rect.width >= 140 && rect.width <= 600 && rect.height >= 120 && rect.height <= 650) {
                    return currentElement;
                }
            }
            currentElement = currentElement.parentElement;
        }
        return null;
    }

    function isInsideCardProductPreview(element, cardContainer) {
        const previewWrapper = element.closest('[class*="productPreview"]');
        return Boolean(previewWrapper && cardContainer.contains(previewWrapper));
    }

    function isInsideCardAvatarPreview(element, cardContainer) {
        const avatarWrapper = element.closest('[class*="avatar"]');
        return Boolean(avatarWrapper && cardContainer.contains(avatarWrapper));
    }

    function resolveCardItemName(cardContainer, fallbackAlt = '') {
        const productNameNode = cardContainer.querySelector('[class*="productName"]');
        const productNameText = productNameNode ? productNameNode.textContent.trim() : '';
        if (productNameText) {
            return { name: cleanString(productNameText), resolved: true };
        }
        const candidateNodes = Array.from(cardContainer.querySelectorAll('h1, h2, h3, h4, [class*="title"], [class*="name"], [class*="heading"], span, div'));
        for (const textNode of candidateNodes) {
            if (textNode.children.length > 0) continue;
            if (isInsideCardProductPreview(textNode, cardContainer)) continue;
            const rawText = textNode.textContent.trim();
            if (!rawText || rawText.length < 2 || rawText.length > 50) continue;
            const lowerText = rawText.toLowerCase();
            if (
                /^\d+$/.test(lowerText) ||
                lowerText.includes('$') ||
                lowerText.includes('€') ||
                lowerText.includes('£') ||
                lowerText.includes('nitro') ||
                lowerText.includes('buy') ||
                lowerText.includes('gift') ||
                lowerText.includes('kaufen') ||
                lowerText.includes('geschenk') ||
                lowerText.includes('new') ||
                lowerText.includes('neu')
            ) {
                continue;
            }
            let isCategoryKeyword = false;
            for (const categoryKey in shopKeywords) {
                if (shopKeywords[categoryKey].some(kw => lowerText === kw)) {
                    isCategoryKeyword = true;
                    break;
                }
            }
            if (!isCategoryKeyword) {
                return { name: cleanString(rawText), resolved: true };
            }
        }
        if (fallbackAlt && fallbackAlt.trim() !== '') {
            return { name: cleanString(fallbackAlt), resolved: true };
        }
        const ariaLabel = cardContainer.getAttribute('aria-label');
        if (ariaLabel && ariaLabel.trim() !== '') {
            return { name: cleanString(ariaLabel.split(',')[0]), resolved: true };
        }
        return { name: 'Unknown_Item', resolved: false };
    }

    function detectCardTypeFromDom(cardContainer) {
        if (!cardContainer || typeof cardContainer.querySelector !== 'function') return null;
        if (cardContainer.querySelector('[class*="nameplatePreview"]')) return 'nameplates';
        if (cardContainer.querySelector('[class*="profileFrame"]')) return 'frames';
        if (cardContainer.querySelector('[class*="profileEffects"]')) return 'profiles';
        if (cardContainer.querySelector('[class*="staticPreviewContainer"]')) return 'bundles';
        if (cardContainer.querySelector('[class*="avatarDecoration"]')) return 'avatars';
        return null;
    }

    function detectCardCategory(cardContainer, assetUrls) {
        const domCategory = detectCardTypeFromDom(cardContainer);
        if (domCategory) return domCategory;
        const hrefLower = window.location.href.toLowerCase();
        if (hrefLower.includes('tab=nameplates')) return 'nameplates';
        if (hrefLower.includes('tab=profile-frames')) return 'frames';
        if (hrefLower.includes('tab=profile-effects')) return 'profiles';
        if (hrefLower.includes('tab=avatar-decorations')) return 'avatars';

        const cardLabel = ((cardContainer.getAttribute('aria-label') || '') + ' ' + (cardContainer.textContent || '')).toLowerCase();
        if (shopKeywords.frames.some(kw => cardLabel.includes(kw))) return 'frames';
        if (shopKeywords.profiles.some(kw => cardLabel.includes(kw))) return 'profiles';
        if (shopKeywords.nameplates.some(kw => cardLabel.includes(kw))) return 'nameplates';
        if (shopKeywords.avatars.some(kw => cardLabel.includes(kw))) return 'avatars';

        const joinedUrls = assetUrls.join(' ').toLowerCase();
        if (joinedUrls.includes('nameplate')) return 'nameplates';
        if (joinedUrls.includes('profile-frame')) return 'frames';
        if (joinedUrls.includes('profile-effect') || joinedUrls.includes('profile_effect')) return 'profiles';
        return 'avatars';
    }

    function isCollectiblesShopMediaUrl(rawUrl) {
        return /\/media\/v1\/collectibles-shop\//i.test(String(rawUrl || ''));
    }

    function buildAnimatedDecorationUrl(rawUrl) {
        try {
            const parsedUrl = new URL(rawUrl, window.location.origin);
            if (isCollectiblesShopMediaUrl(parsedUrl.pathname)) {
                parsedUrl.pathname = parsedUrl.pathname.replace(/\/static$/i, '/animated');
                return parsedUrl.toString();
            }
            parsedUrl.pathname = parsedUrl.pathname.replace(/\.webp$/i, '.png');
            parsedUrl.searchParams.set('passthrough', 'true');
            return parsedUrl.toString();
        } catch (err) {
            return rawUrl;
        }
    }

    function isAnimatedDecorationUrl(rawUrl) {
        return /[?&](passthrough|animated)=true/i.test(rawUrl) || /\/media\/v1\/collectibles-shop\/[^?#]+\/animated(?:[?#]|$)/i.test(rawUrl);
    }

    const shopAssetPathMarkers = ['avatar-decoration-presets', 'profile-effects', 'profile_effects', 'collectibles', 'nameplates', 'profile-frames'];

    function isShopAssetUrl(rawUrl) {
        if (!rawUrl.includes('cdn.discordapp.com') && !rawUrl.includes('media.discordapp.net')) return false;
        if (rawUrl.includes('/avatars/') || rawUrl.includes('/icons/') || rawUrl.includes('/banners/') || rawUrl.includes('/emojis/')) return false;
        return shopAssetPathMarkers.some(marker => rawUrl.includes(marker));
    }

    const shopCardAssetMediaSelector = '[class*="profileEffects"], [class*="profileFrameContainer"], [class*="nameplatePreviewSampleItem"], [class*="avatarDecoration"]';

    function isShopCardAssetMediaElement(mediaElement) {
        return Boolean(mediaElement && typeof mediaElement.closest === 'function' && mediaElement.closest(shopCardAssetMediaSelector));
    }

    function isDiscordContentAssetUrl(rawUrl) {
        return /^https:\/\/(?:cdn\.discordapp\.com|media\.discordapp\.net)\/assets\/content\//i.test(String(rawUrl || ''));
    }

    function buildShopViewSignature() {
        const shopSearchInput = Array.from(document.querySelectorAll('input[type="text"], input[type="search"]')).find(inputNode => !inputNode.closest('#rw-scraper-ui'));
        const shopSearchValue = shopSearchInput ? String(shopSearchInput.value || '').trim().toLowerCase() : '';
        const selectedShopFilters = Array.from(document.querySelectorAll('[data-mana-component="checkbox"][data-selected="true"]'))
            .filter(filterNode => !filterNode.closest('#rw-scraper-ui'))
            .map(filterNode => (filterNode.textContent || '').trim())
            .sort()
            .join('|');
        return `${window.location.href}::${shopSearchValue}::${selectedShopFilters}`;
    }

    function extractMediaUrlCandidates(mediaElement) {
        const candidateUrls = [];
        const pushUrl = rawValue => {
            if (!rawValue || typeof rawValue !== 'string') return;
            rawValue.split(/,\s+/).forEach(part => {
                const firstToken = part.trim().split(/\s+/)[0];
                if (firstToken) candidateUrls.push(firstToken);
            });
        };
        pushUrl(mediaElement.src || mediaElement.getAttribute('src'));
        pushUrl(mediaElement.currentSrc);
        pushUrl(mediaElement.getAttribute('srcset'));
        pushUrl(mediaElement.getAttribute('poster'));
        pushUrl(mediaElement.getAttribute('data-src'));
        const inlineBackground = mediaElement.style ? mediaElement.style.backgroundImage : '';
        if (inlineBackground) {
            const backgroundMatches = inlineBackground.match(/url\(["']?[^"')]+["']?\)/g) || [];
            backgroundMatches.forEach(matchText => pushUrl(matchText.replace(/^url\(["']?/, '').replace(/["']?\)$/, '')));
        }
        const isCardAssetMedia = isShopCardAssetMediaElement(mediaElement);
        return candidateUrls.filter(candidateUrl => isShopAssetUrl(candidateUrl) || (isCardAssetMedia && isDiscordContentAssetUrl(candidateUrl)));
    }

    function resolveUrlExtension(assetUrl) {
        const collectiblesPathMatch = assetUrl.split('?')[0].match(/\/media\/v1\/collectibles-shop\/.+\/(video|animated|static)$/i);
        if (collectiblesPathMatch) return collectiblesPathMatch[1].toLowerCase() === 'video' ? 'webm' : 'png';
        const rawExtension = (assetUrl.split('?')[0].split('.').pop() || '').toLowerCase();
        return /^[a-z0-9]{2,4}$/.test(rawExtension) ? rawExtension : 'png';
    }

    function pickPrimaryMedia(mediaList, preferredExtensions) {
        for (const preferredExtension of preferredExtensions) {
            const matchingMedia = mediaList.find(item => item.url.toLowerCase().endsWith(`.${preferredExtension}`) || (isCollectiblesShopMediaUrl(item.url) && resolveUrlExtension(item.url) === preferredExtension));
            if (matchingMedia) return matchingMedia;
        }
        return mediaList[0];
    }

    function buildCollectionKey(category, itemName, hasName, firstUrl) {
        if (category === 'nameplates') return `${category}::${firstUrl.replace(/\/[^/]*$/, '')}`;
        if (category === 'profiles' && hasName) return `${category}::${itemName}`;
        return `${category}::${firstUrl}`;
    }

    function buildSingleDownloadCandidates(category, primaryUrl) {
        if (isCollectiblesShopMediaUrl(primaryUrl)) {
            if (category === 'nameplates' && /\/static$/i.test(primaryUrl)) {
                return [primaryUrl.replace(/\/static$/i, '/video'), primaryUrl];
            }
            if (category === 'avatars' && /\/static$/i.test(primaryUrl)) {
                return [primaryUrl.replace(/\/static$/i, '/animated'), primaryUrl];
            }
            return [primaryUrl];
        }
        if (category === 'avatars') return [`${primaryUrl}?passthrough=true`, primaryUrl];
        if (category === 'nameplates' && /\/static\.png$/i.test(primaryUrl)) {
            return [primaryUrl.replace(/\/static\.png$/i, '/asset.webm'), primaryUrl];
        }
        return [primaryUrl];
    }

    function detectMediaExtension(byteArray, fallbackExtension) {
        if (!byteArray || byteArray.length < 12) return fallbackExtension;
        const startsWithBytes = (signature, offset = 0) => signature.every((byteValue, index) => byteArray[offset + index] === byteValue);
        if (startsWithBytes([0x89, 0x50, 0x4E, 0x47])) return 'png';
        if (startsWithBytes([0x1A, 0x45, 0xDF, 0xA3])) return 'webm';
        if (startsWithBytes([0x47, 0x49, 0x46, 0x38])) return 'gif';
        if (startsWithBytes([0xFF, 0xD8, 0xFF])) return 'jpg';
        if (startsWithBytes([0x52, 0x49, 0x46, 0x46]) && startsWithBytes([0x57, 0x45, 0x42, 0x50], 8)) return 'webp';
        if (startsWithBytes([0x66, 0x74, 0x79, 0x70], 4)) return 'mp4';
        return fallbackExtension;
    }

    async function fetchFirstAvailableBlob(candidateUrls) {
        let lastError = null;
        for (let candidateIndex = 0; candidateIndex < candidateUrls.length; candidateIndex++) {
            const isLastCandidate = candidateIndex === candidateUrls.length - 1;
            try {
                return await fetchWithBackoff(candidateUrls[candidateIndex], isLastCandidate ? 4 : 1);
            } catch (err) {
                lastError = err;
            }
        }
        throw lastError || new Error('No download candidates available');
    }

    const shopCategoryTabs = ['nameplates', 'avatar-decorations', 'profile-frames', 'profile-effects'];
    let profileEffectConfigsByTitle = null;
    let profileEffectConfigsLoading = false;
    let profileEffectConfigsRetryAfter = 0;
    const collectedAssetSourceCards = new Map();

    function isShopCategoryPageActive() {
        if (!window.location.pathname.startsWith('/shop')) return false;
        const hrefLower = window.location.href.toLowerCase();
        if (shopCategoryTabs.some(tabName => hrefLower.includes(`tab=${tabName}`))) return true;
        return document.querySelector('[data-testid="collectibles-shop-product-card"]') !== null;
    }

    function normalizeShopTitle(rawTitle) {
        return String(rawTitle || '').toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function readConfigField(configObject, fieldNames) {
        if (!configObject) return null;
        for (const fieldName of fieldNames) {
            if (configObject[fieldName] !== undefined && configObject[fieldName] !== null) return configObject[fieldName];
        }
        return null;
    }

    async function loadProfileEffectConfigs() {
        if (profileEffectConfigsByTitle || profileEffectConfigsLoading || Date.now() < profileEffectConfigsRetryAfter) return;
        profileEffectConfigsLoading = true;
        try {
            const token = getDiscordToken();
            if (!token) throw new Error('Missing auth token');
            const configResponse = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/user-profile-effects`, token);
            if (configResponse.status === 404) {
                profileEffectConfigsRetryAfter = Number.POSITIVE_INFINITY;
                return;
            }
            if (!configResponse.ok) throw new Error(`HTTP ${configResponse.status}`);
            const configPayload = await configResponse.json();
            const configList = Array.isArray(configPayload)
                ? configPayload
                : (configPayload.profile_effect_configs || configPayload.profileEffectConfigs || configPayload.profile_effects || []);
            const titleMap = new Map();
            configList.forEach(configEntry => {
                const normalizedTitle = normalizeShopTitle(readConfigField(configEntry, ['title', 'name']));
                if (normalizedTitle && !titleMap.has(normalizedTitle)) titleMap.set(normalizedTitle, configEntry);
            });
            profileEffectConfigsByTitle = titleMap;
        } catch (err) {
            profileEffectConfigsRetryAfter = Date.now() + 30000;
            rwError("Profile effect config load failed", err);
        } finally {
            profileEffectConfigsLoading = false;
        }
    }

    function readCardProductFromReact(cardContainer) {
        try {
            const fiberPropertyName = Object.keys(cardContainer).find(propertyName => propertyName.startsWith('__reactFiber$'));
            let currentFiber = fiberPropertyName ? cardContainer[fiberPropertyName] : null;
            for (let fiberDepth = 0; fiberDepth < 25 && currentFiber; fiberDepth++) {
                const fiberProps = currentFiber.memoizedProps;
                if (fiberProps && fiberProps.product && typeof fiberProps.product === 'object') return fiberProps.product;
                currentFiber = currentFiber.return;
            }
        } catch (err) {
            rwError("React product lookup failed", err);
        }
        return null;
    }

    function readCardProfileEffectConfig(cardContainer) {
        const cardProduct = readCardProductFromReact(cardContainer);
        if (!cardProduct || !Array.isArray(cardProduct.items)) return null;
        return cardProduct.items.find(productItem => productItem && Array.isArray(productItem.effects) && productItem.effects.length > 0) || null;
    }

    function readCardProfileFrameConfig(cardContainer) {
        const cardProduct = readCardProductFromReact(cardContainer);
        if (!cardProduct || !Array.isArray(cardProduct.items)) return null;
        return cardProduct.items.find(productItem => productItem && /^\d{5,25}$/.test(String(productItem.skuId || '')) && Array.isArray(productItem.layers) && productItem.layers.length > 0) || null;
    }

    function buildProfileFrameParts(frameConfig, cardMediaList) {
        const partsMap = new Map();
        const domStylesByUrl = new Map((cardMediaList || []).map(mediaItem => [mediaItem.url, mediaItem.style]));
        frameConfig.layers.forEach((frameLayer, layerIndex) => {
            if (!frameLayer || !/^\d{5,25}$/.test(String(frameLayer.id || ''))) return;
            const layerUrl = `https://cdn.discordapp.com/media/v1/collectibles-shop/${frameConfig.skuId}/${frameLayer.id}/static`;
            if (partsMap.has(layerUrl)) return;
            partsMap.set(layerUrl, {
                url: layerUrl,
                style: Object.assign({}, domStylesByUrl.get(layerUrl) || {}, {
                    role: 'frame_layer',
                    layer_index: layerIndex,
                    layer_type: frameLayer.type ?? null,
                    order: frameLayer.order ?? null,
                    anchor: frameLayer.anchor ?? null,
                    responsive: Boolean(frameLayer.responsive),
                    inner_width: frameConfig.innerWidth ?? null,
                    overflow_top: frameConfig.overflowTop ?? null,
                    overflow_bottom: frameConfig.overflowBottom ?? null,
                    overflow_horizontal: frameConfig.overflowHorizontal ?? null
                })
            });
        });
        return partsMap;
    }

    function buildProfileEffectParts(configEntry) {
        const partsMap = new Map();
        const addPart = (partUrl, partStyle) => {
            if (typeof partUrl !== 'string' || partUrl === '') return;
            const cleanPartUrl = partUrl.split('?')[0];
            if (!partsMap.has(cleanPartUrl)) partsMap.set(cleanPartUrl, { url: cleanPartUrl, style: partStyle });
        };
        const effectLayers = Array.isArray(configEntry.effects) ? configEntry.effects : [];
        effectLayers.forEach((effectLayer, layerIndex) => {
            const layerPosition = effectLayer.position || {};
            addPart(effectLayer.src, {
                role: 'effect',
                layer_index: layerIndex,
                loop: Boolean(effectLayer.loop),
                width: effectLayer.width ?? null,
                height: effectLayer.height ?? null,
                duration: effectLayer.duration ?? null,
                start: effectLayer.start ?? null,
                loop_delay: effectLayer.loop_delay ?? effectLayer.loopDelay ?? null,
                left: layerPosition.x ?? 0,
                top: layerPosition.y ?? 0,
                z_index: effectLayer.z_index ?? effectLayer.zIndex ?? null
            });
        });
        addPart(readConfigField(configEntry, ['thumbnail_preview_src', 'thumbnailPreviewSrc']), { role: 'thumbnail' });
        addPart(readConfigField(configEntry, ['reduced_motion_src', 'reducedMotionSrc']), { role: 'reduced_motion' });
        return partsMap;
    }

    function collectProfileEffectsFromConfigs() {
        if (!profileEffectConfigsByTitle || profileEffectConfigsByTitle.size === 0) return;
        const matchedTitles = new Set();
        const isProfileEffectTab = window.location.href.toLowerCase().includes('tab=profile-effects');
        document.querySelectorAll('h1, h2, h3, h4, p, span, div').forEach(textNode => {
            if (textNode.children.length > 0) return;
            const owningProductCard = textNode.closest('[data-testid="collectibles-shop-product-card"]');
            if (!owningProductCard && !isProfileEffectTab) return;
            if (owningProductCard && detectCardCategory(owningProductCard, []) !== 'profiles') return;
            const normalizedText = normalizeShopTitle(textNode.textContent);
            if (!normalizedText || normalizedText.length > 80 || matchedTitles.has(normalizedText)) return;
            const configEntry = profileEffectConfigsByTitle.get(normalizedText);
            if (!configEntry || isExcludedShopElement(textNode)) return;
            const effectParts = buildProfileEffectParts(configEntry);
            if (effectParts.size === 0) return;
            matchedTitles.add(normalizedText);
            const effectName = getSafeFileName(cleanString(readConfigField(configEntry, ['title', 'name'])));
            const effectKey = `profiles::${effectName}`;
            Array.from(collectedAssets.entries()).forEach(([existingKey, existingEntry]) => {
                if (existingKey === effectKey || existingEntry.category !== 'profiles' || !existingEntry.parts) return;
                if (Array.from(existingEntry.parts.keys()).some(existingPartUrl => effectParts.has(existingPartUrl))) {
                    collectedAssets.delete(existingKey);
                }
            });
            collectedAssets.set(effectKey, {
                isFrame: false,
                isMultiPart: true,
                category: 'profiles',
                itemName: effectName,
                hasName: true,
                url: effectParts.keys().next().value,
                parts: effectParts
            });
        });
    }

    function scrapeCurrentView() {
        try {
            if (!window.location.pathname.startsWith('/shop')) {
                el.btn.disabled = true;
                return;
            }

            const foundTotalCategories = extractTotals();

            if (!isShopCategoryPageActive()) {
                collectedAssets.clear();
                lastShopHref = '';
                el.loaded.innerText = '0';
                el.names.innerText = '0';
                el.already.innerText = '0';
                el.btn.disabled = true;
                return;
            }
            const mediaElements = document.querySelectorAll('img, video, source, [style*="background-image"]');
            const cardGroups = new Map();
            const cardCategoryCache = new Map();

            mediaElements.forEach(mediaEl => {
                if (isExcludedShopElement(mediaEl)) return;
                const shopUrlCandidates = extractMediaUrlCandidates(mediaEl);
                if (shopUrlCandidates.length === 0) return;
                const cardContainer = findShopCardContainer(mediaEl);
                if (!cardContainer) return;
                if (!cardCategoryCache.has(cardContainer)) {
                    cardCategoryCache.set(cardContainer, detectCardCategory(cardContainer, shopUrlCandidates));
                }
                const cardCategory = cardCategoryCache.get(cardContainer);
                if (cardCategory === 'bundles') return;
                const isAvatarDecorationCard = cardCategory === 'avatars';
                if (!isAvatarDecorationCard && isInsideCardAvatarPreview(mediaEl, cardContainer)) return;

                shopUrlCandidates.forEach(candidateUrl => {
                    const rawUrl = isAvatarDecorationCard && isCollectiblesShopMediaUrl(candidateUrl) ? buildAnimatedDecorationUrl(candidateUrl) : candidateUrl;
                    if (isAvatarDecorationCard && !isAnimatedDecorationUrl(rawUrl)) return;
                    const cleanAssetUrl = rawUrl.split('?')[0];
                    if (cleanAssetUrl.endsWith('.svg')) return;
                    if (!cardGroups.has(cardContainer)) {
                        cardGroups.set(cardContainer, []);
                    }
                    const existingEntries = cardGroups.get(cardContainer);
                    if (!existingEntries.some(entry => entry.url === cleanAssetUrl)) {
                        const computedStyle = window.getComputedStyle(mediaEl);
                        existingEntries.push({
                            url: cleanAssetUrl,
                            alt: mediaEl.alt || '',
                            style: {
                                width: computedStyle.width,
                                height: computedStyle.height,
                                top: computedStyle.top,
                                left: computedStyle.left,
                                position: computedStyle.position,
                                transform: computedStyle.transform
                            }
                        });
                    }
                });
            });

            const currentShopViewSignature = buildShopViewSignature();
            if (currentShopViewSignature !== lastShopHref) {
                lastShopHref = currentShopViewSignature;
                collectedAssets.clear();
            }

            let hasProfileCardWithoutProductConfig = false;
            Array.from(cardGroups.entries()).forEach(([cardContainer, cardMediaList]) => {
                if (cardMediaList.length === 0) return;
                const assetUrls = cardMediaList.map(item => item.url);
                const category = cardCategoryCache.get(cardContainer) || detectCardCategory(cardContainer, assetUrls);
                if (category === 'bundles') return;
                const productEffectConfig = category === 'profiles' ? readCardProfileEffectConfig(cardContainer) : null;
                if (category === 'profiles' && !productEffectConfig) hasProfileCardWithoutProductConfig = true;
                const primaryAlt = cardMediaList.find(item => item.alt)?.alt || '';
                const { name: itemName, resolved: hasName } = resolveCardItemName(cardContainer, primaryAlt);
                const safeName = getSafeFileName(itemName);
                const collectionKey = buildCollectionKey(category, safeName, hasName, cardMediaList[0].url);
                collectedAssetSourceCards.set(collectionKey, cardContainer);
                const existingEntry = collectedAssets.get(collectionKey);
                const keepExistingName = Boolean(existingEntry && existingEntry.hasName && !hasName);
                const finalName = keepExistingName ? existingEntry.itemName : safeName;
                const finalHasName = keepExistingName ? true : hasName;

                const productFrameConfig = category === 'frames' ? readCardProfileFrameConfig(cardContainer) : null;
                if (productFrameConfig) {
                    const productFrameParts = buildProfileFrameParts(productFrameConfig, cardMediaList);
                    if (productFrameParts.size > 0) {
                        collectedAssets.set(collectionKey, {
                            isFrame: true,
                            isMultiPart: true,
                            category: 'frames',
                            itemName: finalName,
                            hasName: finalHasName,
                            url: productFrameParts.keys().next().value,
                            parts: productFrameParts
                        });
                        return;
                    }
                }

                if (productEffectConfig) {
                    const productEffectParts = buildProfileEffectParts(productEffectConfig);
                    if (productEffectParts.size > 0) {
                        collectedAssets.set(collectionKey, {
                            isFrame: false,
                            isMultiPart: true,
                            category: 'profiles',
                            itemName: finalName,
                            hasName: finalHasName,
                            url: productEffectParts.keys().next().value,
                            parts: productEffectParts
                        });
                        return;
                    }
                }

                if (category === 'frames' || category === 'profiles') {
                    const partsMap = existingEntry && existingEntry.parts ? existingEntry.parts : new Map();
                    cardMediaList.forEach(mediaItem => {
                        if (!partsMap.has(mediaItem.url)) {
                            partsMap.set(mediaItem.url, {
                                url: mediaItem.url,
                                style: mediaItem.style
                            });
                        }
                    });
                    collectedAssets.set(collectionKey, {
                        isFrame: category === 'frames',
                        isMultiPart: true,
                        category: category,
                        itemName: finalName,
                        hasName: finalHasName,
                        url: existingEntry ? existingEntry.url : cardMediaList[0].url,
                        parts: partsMap
                    });
                } else {
                    const preferredExtensions = category === 'nameplates' ? ['webm', 'gif', 'png'] : ['png', 'gif', 'webm'];
                    const primaryMedia = pickPrimaryMedia(cardMediaList, preferredExtensions);
                    const primaryExtension = resolveUrlExtension(primaryMedia.url);
                    if (existingEntry && existingEntry.extension === 'webm' && primaryExtension !== 'webm') return;
                    collectedAssets.set(collectionKey, {
                        isFrame: false,
                        isMultiPart: false,
                        category: category,
                        itemName: finalName,
                        hasName: finalHasName,
                        extension: primaryExtension,
                        url: primaryMedia.url,
                        candidateUrls: buildSingleDownloadCandidates(category, primaryMedia.url)
                    });
                }
            });

            Array.from(collectedAssetSourceCards.entries()).forEach(([assetKey, sourceCard]) => {
                if (sourceCard && sourceCard.isConnected) return;
                collectedAssetSourceCards.delete(assetKey);
                collectedAssets.delete(assetKey);
            });

            if (hasProfileCardWithoutProductConfig) {
                loadProfileEffectConfigs();
                collectProfileEffectsFromConfigs();
            }

            let resolvedNameTotal = 0;
            let alreadyDownloadedTotal = 0;
            collectedAssets.forEach(assetEntry => {
                if (assetEntry.hasName) resolvedNameTotal++;
                if (sessionDownloaded.has(assetEntry.url) || persistentDownloadHistory.has(assetEntry.url)) alreadyDownloadedTotal++;
            });
            const detectedCategoryCounts = { nameplates: 0, avatars: 0, profiles: 0, frames: 0 };
            collectedAssets.forEach(assetEntry => {
                if (detectedCategoryCounts[assetEntry.category] !== undefined) detectedCategoryCounts[assetEntry.category]++;
            });
            if (!foundTotalCategories.has('nameplates')) el.totNameplates.innerText = detectedCategoryCounts.nameplates;
            if (!foundTotalCategories.has('avatars')) el.totAvatars.innerText = detectedCategoryCounts.avatars;
            if (!foundTotalCategories.has('profiles')) el.totProfiles.innerText = detectedCategoryCounts.profiles;
            if (!foundTotalCategories.has('frames')) el.totFrames.innerText = detectedCategoryCounts.frames;
            nameCount = resolvedNameTotal;
            alreadyDlCount = alreadyDownloadedTotal;
            el.loaded.innerText = collectedAssets.size;
            el.names.innerText = nameCount;
            el.already.innerText = alreadyDlCount;

            el.btn.disabled = collectedAssets.size === 0;
        } catch (err) {}
    }

    let shopScrapeScheduled = false;
    function handleShopScroll() {
        if (shopScrapeScheduled) return;
        shopScrapeScheduled = true;
        setTimeout(() => {
            shopScrapeScheduled = false;
            scrapeCurrentView();
        }, 200);
    }

    document.addEventListener('scroll', handleShopScroll, { capture: true, passive: true });
    const scrapeInterval = setInterval(scrapeCurrentView, 1200);

    function teardownScraper() {
        clearInterval(scrapeInterval);
        document.removeEventListener('scroll', handleShopScroll, { capture: true });
        document.removeEventListener('mousemove', handleWindowDragMove);
        document.removeEventListener('mouseup', handleWindowDragEnd);
        stopManualCapture();
        restoreOriginalConsole();
        try {
            if (window.__rwOriginalSetRequestHeader) XMLHttpRequest.prototype.setRequestHeader = window.__rwOriginalSetRequestHeader;
            if (window.__rwOriginalFetch) window.fetch = window.__rwOriginalFetch;
        } catch (restoreErr) {}
        tooltipNode.remove();
        settingsStorageFrame.remove();
        ui.remove();
        style.remove();
        if (window.__rwScraperCleanup === teardownScraper) delete window.__rwScraperCleanup;
    }

    window.__rwScraperCleanup = teardownScraper;
    el.closeBtn.addEventListener('click', teardownScraper);

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const randomJitter = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    async function fetchWithBackoff(url, retries = 4, backoff = 1500, headers = {}) {
        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const response = await fetch(url, { headers });
                if (response.status === 429) {
                    const retryAfter = response.headers.get('Retry-After');
                    const waitTime = retryAfter ? (parseFloat(retryAfter) * 1000) : (backoff * Math.pow(2, attempt));
                    await sleep(waitTime + randomJitter(500, 1500));
                    continue;
                }
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return await response.blob();
            } catch (err) {
                if (attempt === retries - 1) throw err;
                await sleep((backoff * Math.pow(2, attempt)) + randomJitter(300, 900));
            }
        }
        throw new Error('Rate limit retries exhausted');
    }

    function readDownloadDelayRange() {
        const minDelayVal = Math.max(0, parseInt(el.minDelay.value, 10) || 400);
        const maxDelayVal = Math.max(minDelayVal, parseInt(el.maxDelay.value, 10) || 1200);
        return { minDelayVal, maxDelayVal };
    }

    async function sleepWithConfiguredDelay() {
        const delayRange = readDownloadDelayRange();
        await sleep(Math.max(350, randomJitter(delayRange.minDelayVal, delayRange.maxDelayVal)));
    }

    async function writeBytesToDirectory(directoryHandle, fileName, byteData) {
        const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(byteData);
        await writable.close();
    }

    async function saveCollectibleItem(itemData, zipArchive, delayRange) {
        const categoryDirHandle = dirHandles[itemData.category] || null;
        const folderCategoryName = itemData.category.charAt(0).toUpperCase() + itemData.category.slice(1);
        let wroteToZip = false;

        if (itemData.isMultiPart && itemData.parts) {
            const layoutJson = { itemName: itemData.itemName, parts: [] };
            let partIndex = 1;
            let subDirHandle = null;

            if (categoryDirHandle) {
                try {
                    subDirHandle = await categoryDirHandle.getDirectoryHandle(itemData.itemName, { create: true });
                } catch (dirErr) {
                    subDirHandle = null;
                    rwError("Sub directory creation failed", dirErr);
                }
            }

            for (const [partUrl, partData] of itemData.parts.entries()) {
                const partCandidateUrls = itemData.category === 'profiles' && /\.webp$/i.test(partUrl)
                    ? [partUrl.replace(/\.webp$/i, '.png'), partUrl]
                    : [partUrl];
                const partBlob = await fetchFirstAvailableBlob(partCandidateUrls);
                const uint8Part = new Uint8Array(await partBlob.arrayBuffer());
                const partExt = detectMediaExtension(uint8Part, resolveUrlExtension(partUrl));
                const partFilename = `${itemData.itemName}_part_${partIndex}.${partExt}`;
                layoutJson.parts.push({ filename: partFilename, style: partData.style });

                if (subDirHandle) {
                    await writeBytesToDirectory(subDirHandle, partFilename, uint8Part);
                } else {
                    zipArchive.addFile(`${folderCategoryName}/${itemData.itemName}/${partFilename}`, uint8Part);
                    wroteToZip = true;
                }
                sessionDownloaded.add(partUrl);
                partIndex++;
                await sleep(randomJitter(delayRange.minDelayVal, delayRange.maxDelayVal));
            }

            const encodedLayout = new TextEncoder().encode(JSON.stringify(layoutJson, null, 4));
            if (subDirHandle) {
                await writeBytesToDirectory(subDirHandle, 'layout.json', encodedLayout);
            } else {
                zipArchive.addFile(`${folderCategoryName}/${itemData.itemName}/layout.json`, encodedLayout);
                wroteToZip = true;
            }
            return wroteToZip;
        }

        const blob = await fetchFirstAvailableBlob(itemData.candidateUrls || [itemData.url]);
        const uint8Data = new Uint8Array(await blob.arrayBuffer());
        const resolvedExtension = detectMediaExtension(uint8Data, itemData.extension || 'png');
        const resolvedFilename = `${itemData.itemName}.${resolvedExtension}`;
        if (categoryDirHandle) {
            await writeBytesToDirectory(categoryDirHandle, resolvedFilename, uint8Data);
        } else {
            zipArchive.addFile(`${folderCategoryName}/${resolvedFilename}`, uint8Data);
            wroteToZip = true;
        }
        sessionDownloaded.add(itemData.url);
        await sleep(randomJitter(delayRange.minDelayVal, delayRange.maxDelayVal));
        return wroteToZip;
    }

    function formatItemCount(itemCount, singularLabel, pluralLabel) {
        return `${itemCount} ${itemCount === 1 ? singularLabel : pluralLabel}`;
    }

    function deliverZipArchive(zipArchive, zipFileName) {
        if (!zipArchive || zipArchive.files.length === 0) return false;
        if (zipArchive.files.length === 1) {
            const onlyFile = zipArchive.files[0];
            return triggerDirectDownload(new Blob([onlyFile.data]), onlyFile.name.split('/').pop());
        }
        return triggerDirectDownload(zipArchive.generate(), zipFileName);
    }

    function refreshShopDownloadCounters() {
        el.dlNameplates.innerText = dlStats.nameplates;
        el.dlAvatars.innerText = dlStats.avatars;
        el.dlProfiles.innerText = dlStats.profiles;
        el.dlFrames.innerText = dlStats.frames;
    }

    el.btn.addEventListener('click', async () => {
        if (!isShopCategoryPageActive()) {
            return showNotification("Open a Discord Shop page with items first.");
        }
        const shouldSkipKnown = document.getElementById('rw-shop-skip-known').checked;
        const entries = Array.from(collectedAssets.values()).filter(itemData => !shouldSkipKnown || !persistentDownloadHistory.has(itemData.url));
        if (entries.length === 0) {
            return showNotification(shouldSkipKnown ? "All detected items were already downloaded in earlier sessions." : "No items detected yet.");
        }

        const delayRange = readDownloadDelayRange();

        el.btn.innerText = "Processing...";
        el.btn.disabled = true;

        let downloadedItems = 0;
        let failedItems = 0;
        const zipArchive = new LabsZip();
        let hasZipFiles = false;

        try {
            for (const itemData of entries) {
                try {
                    if (await saveCollectibleItem(itemData, zipArchive, delayRange)) hasZipFiles = true;
                    if (dlStats[itemData.category] !== undefined) dlStats[itemData.category]++;
                    refreshShopDownloadCounters();
                    persistentDownloadHistory.add(itemData.url);
                    alreadyDlCount++;
                    el.already.innerText = alreadyDlCount;
                    downloadedItems++;
                } catch (itemErr) {
                    failedItems++;
                    rwError(`Shop item download failed: ${itemData.itemName}`, itemErr);
                }
                const processedShopItems = downloadedItems + failedItems;
                el.btn.innerText = `Downloading... (${processedShopItems}/${entries.length})`;
                updateProgressBar('rw-shop', (processedShopItems / entries.length) * 100, `${Math.round((processedShopItems / entries.length) * 100)}% (${processedShopItems}/${entries.length})`);
            }
            persistDownloadHistory();

            if (hasZipFiles) deliverZipArchive(zipArchive, `discord_shop_assets_${Date.now()}.zip`);

            el.btn.innerText = "Download Complete!";
            const shopResultText = `Downloaded ${formatItemCount(downloadedItems, 'shop item', 'shop items')}`;
            showNotification(failedItems > 0 ? `${shopResultText}, ${failedItems} failed.` : `${shopResultText}!`, failedItems === 0);
        } catch (err) {
            showNotification("Shop asset download encountered an error.");
        } finally {
            setTimeout(() => {
                hideProgressBar('rw-shop');
                el.btn.disabled = !isShopCategoryPageActive() || collectedAssets.size === 0;
                el.btn.innerText = "Download all items from the loaded page";
            }, 2500);
        }
    });

    const inventoryCategoryByProductType = { 0: 'avatars', 1: 'profiles', 2: 'nameplates', 3: 'frames' };
    const inventoryCategoryLabels = { avatars: 'Avatar Decorations', profiles: 'Profile Effects', frames: 'Profile Frames', nameplates: 'Nameplates' };
    const inventoryCategoryOrder = ['avatars', 'profiles', 'frames', 'nameplates'];
    const inventoryEl = {
        mode: document.getElementById('rw-inv-mode'),
        category: document.getElementById('rw-inv-category'),
        unpublishedOnly: document.getElementById('rw-inv-unpublished-only'),
        singleWrap: document.getElementById('rw-inv-single-wrap'),
        search: document.getElementById('rw-inv-search'),
        itemSelect: document.getElementById('rw-inv-item'),
        status: document.getElementById('rw-inv-status'),
        ownedAvatars: document.getElementById('rw-inv-owned-avatars'),
        ownedProfiles: document.getElementById('rw-inv-owned-profiles'),
        ownedFrames: document.getElementById('rw-inv-owned-frames'),
        ownedNameplates: document.getElementById('rw-inv-owned-nameplates'),
        unpublished: document.getElementById('rw-inv-unpublished'),
        selected: document.getElementById('rw-inv-selected'),
        downloaded: document.getElementById('rw-inv-downloaded'),
        loadBtn: document.getElementById('rw-inv-load-btn'),
        downloadBtn: document.getElementById('rw-inv-dl-btn'),
        exportBtn: document.getElementById('rw-inv-export-btn')
    };
    let inventoryEntries = [];
    let inventoryIsLoading = false;
    let inventoryIsDownloading = false;
    let inventoryDownloadedTotal = 0;

    function isValidSnowflakeId(rawValue) {
        return /^\d{15,25}$/.test(String(rawValue || ''));
    }

    function buildInventoryAvatarDecorationEntry(purchaseItem, itemName) {
        const skuId = purchaseItem.sku_id || purchaseItem.skuId;
        const decorationAsset = String(purchaseItem.asset || '');
        const candidateUrls = [];
        if (isValidSnowflakeId(skuId)) candidateUrls.push(`https://cdn.discordapp.com/media/v1/collectibles-shop/${skuId}/animated`);
        if (/^(?:a_)?[0-9a-f]{32}$/i.test(decorationAsset)) {
            candidateUrls.push(`https://cdn.discordapp.com/avatar-decoration-presets/${decorationAsset}.png?passthrough=true`);
            candidateUrls.push(`https://cdn.discordapp.com/avatar-decoration-presets/${decorationAsset}.png`);
        }
        if (candidateUrls.length === 0) return null;
        return { isFrame: false, isMultiPart: false, category: 'avatars', itemName, hasName: true, extension: 'png', url: candidateUrls[0], candidateUrls };
    }

    function buildInventoryNameplateEntry(purchaseItem, itemName) {
        const skuId = purchaseItem.sku_id || purchaseItem.skuId;
        const nameplateAsset = String(purchaseItem.asset || '');
        const candidateUrls = [];
        const hasValidAssetPath = /^nameplates\/[a-z0-9_\-/]+\/$/i.test(nameplateAsset) && !nameplateAsset.includes('..');
        if (isValidSnowflakeId(skuId)) candidateUrls.push(`https://cdn.discordapp.com/media/v1/collectibles-shop/${skuId}/video`);
        if (hasValidAssetPath) candidateUrls.push(`https://cdn.discordapp.com/assets/collectibles/${nameplateAsset}asset.webm`);
        if (isValidSnowflakeId(skuId)) candidateUrls.push(`https://cdn.discordapp.com/media/v1/collectibles-shop/${skuId}/static`);
        if (hasValidAssetPath) candidateUrls.push(`https://cdn.discordapp.com/assets/collectibles/${nameplateAsset}static.png`);
        if (candidateUrls.length === 0) return null;
        return { isFrame: false, isMultiPart: false, category: 'nameplates', itemName, hasName: true, extension: 'webm', url: candidateUrls[0], candidateUrls };
    }

    function buildInventoryProfileEffectEntry(purchaseItem, itemName) {
        const effectParts = buildProfileEffectParts(purchaseItem);
        if (effectParts.size === 0) return null;
        return { isFrame: false, isMultiPart: true, category: 'profiles', itemName, hasName: true, url: effectParts.keys().next().value, parts: effectParts };
    }

    function buildInventoryProfileFrameEntry(purchaseItem, itemName) {
        const frameConfig = {
            skuId: purchaseItem.skuId || purchaseItem.sku_id,
            layers: Array.isArray(purchaseItem.layers) ? purchaseItem.layers : [],
            innerWidth: purchaseItem.innerWidth ?? purchaseItem.inner_width ?? null,
            overflowTop: purchaseItem.overflowTop ?? purchaseItem.overflow_top ?? null,
            overflowBottom: purchaseItem.overflowBottom ?? purchaseItem.overflow_bottom ?? null,
            overflowHorizontal: purchaseItem.overflowHorizontal ?? purchaseItem.overflow_horizontal ?? null
        };
        if (!isValidSnowflakeId(frameConfig.skuId) || frameConfig.layers.length === 0) return null;
        const frameParts = buildProfileFrameParts(frameConfig, []);
        if (frameParts.size === 0) return null;
        return { isFrame: true, isMultiPart: true, category: 'frames', itemName, hasName: true, url: frameParts.keys().next().value, parts: frameParts };
    }

    function buildCollectiblePreviewUrl(category, purchaseItem, downloadEntry) {
        const skuId = purchaseItem && (purchaseItem.sku_id || purchaseItem.skuId);
        if ((category === 'avatars' || category === 'nameplates') && isValidSnowflakeId(skuId)) {
            return `https://cdn.discordapp.com/media/v1/collectibles-shop/${skuId}/static`;
        }
        if (category === 'profiles') {
            const effectPreview = readConfigField(purchaseItem, ['reduced_motion_src', 'reducedMotionSrc', 'thumbnail_preview_src', 'thumbnailPreviewSrc']);
            if (typeof effectPreview === 'string' && /^https:\/\/cdn\.discordapp\.com\//.test(effectPreview)) return effectPreview;
        }
        if (downloadEntry && downloadEntry.isMultiPart && downloadEntry.parts && downloadEntry.parts.size > 0) {
            return downloadEntry.parts.keys().next().value;
        }
        return downloadEntry ? downloadEntry.url : '';
    }

    const collectibleProductCache = new Map();

    async function fetchCollectibleProduct(skuId, token) {
        if (!isValidSnowflakeId(skuId)) throw new Error('Invalid SKU');
        if (collectibleProductCache.has(skuId)) return collectibleProductCache.get(skuId);
        const productResponse = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/collectibles-products/${skuId}`, token);
        if (!productResponse.ok) throw new Error(`HTTP ${productResponse.status}`);
        const productPayload = await productResponse.json();
        if (!productPayload || typeof productPayload !== 'object') throw new Error('Empty product payload');
        if (!productPayload.sku_id) productPayload.sku_id = skuId;
        collectibleProductCache.set(skuId, productPayload);
        return productPayload;
    }

    async function appendCollectibleEntryToZip(downloadEntry, zipArchive, basePath) {
        if (downloadEntry.isMultiPart && downloadEntry.parts) {
            const layoutJson = { itemName: downloadEntry.itemName, parts: [] };
            let partIndex = 1;
            for (const [partUrl, partData] of downloadEntry.parts.entries()) {
                const partBlob = await fetchFirstAvailableBlob([partUrl]);
                const partBytes = new Uint8Array(await partBlob.arrayBuffer());
                const partFilename = `part_${partIndex}.${detectMediaExtension(partBytes, resolveUrlExtension(partUrl))}`;
                zipArchive.addFile(`${basePath}/${partFilename}`, partBytes);
                layoutJson.parts.push({ filename: partFilename, style: partData.style });
                partIndex++;
            }
            zipArchive.addFile(`${basePath}/layout.json`, new TextEncoder().encode(JSON.stringify(layoutJson, null, 4)));
            return;
        }
        const assetBlob = await fetchFirstAvailableBlob(downloadEntry.candidateUrls || [downloadEntry.url]);
        const assetBytes = new Uint8Array(await assetBlob.arrayBuffer());
        zipArchive.addFile(`${basePath}.${detectMediaExtension(assetBytes, downloadEntry.extension || 'png')}`, assetBytes);
    }

    function createAssetPicker(listNode, onSelectionChange) {
        const pickerState = { selectedKey: null };
        listNode.addEventListener('click', (event) => {
            const rowNode = event.target.closest('.rw-asset-row');
            if (!rowNode || !listNode.contains(rowNode)) return;
            pickerState.selectedKey = rowNode.dataset.key;
            listNode.querySelectorAll('.rw-asset-row').forEach(candidateRow => candidateRow.classList.toggle('rw-selected', candidateRow === rowNode));
            setInputValidationState(listNode, true);
            onSelectionChange();
        });

        function render(groupedSections) {
            const visibleKeys = new Set();
            listNode.textContent = '';
            groupedSections.forEach(sectionData => {
                if (!sectionData.rows.length) return;
                const headerNode = document.createElement('div');
                headerNode.className = 'rw-asset-group';
                headerNode.textContent = `${sectionData.title} (${sectionData.rows.length})`;
                listNode.appendChild(headerNode);
                sectionData.rows.forEach(rowData => {
                    visibleKeys.add(rowData.key);
                    const rowNode = document.createElement('div');
                    rowNode.className = 'rw-asset-row';
                    rowNode.dataset.key = rowData.key;
                    if (rowData.key === pickerState.selectedKey) rowNode.classList.add('rw-selected');
                    const thumbNode = document.createElement('img');
                    thumbNode.className = 'rw-asset-thumb';
                    thumbNode.loading = 'lazy';
                    thumbNode.alt = '';
                    thumbNode.addEventListener('error', () => thumbNode.classList.add('rw-thumb-missing'), { once: true });
                    if (rowData.previewUrl) thumbNode.src = rowData.previewUrl;
                    else thumbNode.classList.add('rw-thumb-missing');
                    const metaNode = document.createElement('div');
                    metaNode.className = 'rw-asset-meta';
                    const nameNode = document.createElement('span');
                    nameNode.className = 'rw-asset-name';
                    nameNode.textContent = rowData.name;
                    const subNode = document.createElement('span');
                    subNode.className = 'rw-asset-sub';
                    subNode.textContent = rowData.subtitle;
                    metaNode.append(nameNode, subNode);
                    rowNode.append(thumbNode, metaNode);
                    listNode.appendChild(rowNode);
                });
            });
            if (visibleKeys.size === 0) {
                const emptyNode = document.createElement('div');
                emptyNode.className = 'rw-asset-empty';
                emptyNode.textContent = 'No assets match the current filters.';
                listNode.appendChild(emptyNode);
            }
            if (pickerState.selectedKey && !visibleKeys.has(pickerState.selectedKey)) pickerState.selectedKey = null;
        }

        return {
            render,
            getSelectedKey: () => pickerState.selectedKey
        };
    }

    function buildEntryListExport(entryList, extraFieldsBuilder) {
        return entryList.map(listEntry => Object.assign({
            name: listEntry.displayName,
            category: listEntry.category,
            sku_id: listEntry.skuId,
            removed_from_shop: Boolean(listEntry.isUnpublished),
            file_name: listEntry.downloadEntry.itemName
        }, extraFieldsBuilder ? extraFieldsBuilder(listEntry) : {}));
    }

    function normalizeInventoryPurchases(rawPurchaseList) {
        const normalizedEntries = [];
        const usedNamesPerCategory = { avatars: new Set(), profiles: new Set(), frames: new Set(), nameplates: new Set() };
        rawPurchaseList.forEach(purchase => {
            try {
                const category = inventoryCategoryByProductType[purchase && purchase.type];
                if (!category || !Array.isArray(purchase.items) || purchase.items.length === 0) return;
                if (purchase.expires_at && Date.parse(purchase.expires_at) < Date.now()) return;
                const purchaseItem = purchase.items.find(item => item && inventoryCategoryByProductType[item.type] === category) || purchase.items[0];
                let itemName = getSafeFileName(cleanString(purchase.name || purchaseItem.title || purchaseItem.label || purchase.sku_id));
                if (usedNamesPerCategory[category].has(itemName.toLowerCase())) itemName = getSafeFileName(`${itemName} (${purchase.sku_id})`);
                usedNamesPerCategory[category].add(itemName.toLowerCase());
                let downloadEntry = null;
                if (category === 'avatars') downloadEntry = buildInventoryAvatarDecorationEntry(purchaseItem, itemName);
                else if (category === 'nameplates') downloadEntry = buildInventoryNameplateEntry(purchaseItem, itemName);
                else if (category === 'profiles') downloadEntry = buildInventoryProfileEffectEntry(purchaseItem, itemName);
                else if (category === 'frames') downloadEntry = buildInventoryProfileFrameEntry(purchaseItem, itemName);
                if (!downloadEntry) return;
                normalizedEntries.push({
                    skuId: String(purchase.sku_id || purchaseItem.sku_id || purchaseItem.skuId || ''),
                    displayName: String(purchase.name || itemName),
                    category,
                    isUnpublished: Boolean(purchase.unpublished_at),
                    previewUrl: buildCollectiblePreviewUrl(category, purchaseItem, downloadEntry),
                    downloadEntry
                });
            } catch (entryErr) {
                rwError("Inventory entry normalization failed", entryErr);
            }
        });
        normalizedEntries.sort((leftEntry, rightEntry) => {
            const categoryDelta = inventoryCategoryOrder.indexOf(leftEntry.category) - inventoryCategoryOrder.indexOf(rightEntry.category);
            return categoryDelta !== 0 ? categoryDelta : leftEntry.displayName.localeCompare(rightEntry.displayName);
        });
        return normalizedEntries;
    }

    function getFilteredInventoryEntries(applySearchFilter) {
        const selectedCategory = inventoryEl.category.value;
        const onlyUnpublished = inventoryEl.unpublishedOnly.checked;
        const searchTerm = applySearchFilter ? inventoryEl.search.value.trim().toLowerCase() : '';
        return inventoryEntries.filter(inventoryEntry => {
            if (selectedCategory !== 'all' && inventoryEntry.category !== selectedCategory) return false;
            if (onlyUnpublished && !inventoryEntry.isUnpublished) return false;
            if (searchTerm && !inventoryEntry.displayName.toLowerCase().includes(searchTerm)) return false;
            return true;
        });
    }

    function buildEntryPickerKey(collectionEntry) {
        return `${collectionEntry.category}::${collectionEntry.skuId}`;
    }

    function buildEntryPickerSections(entryList, subtitleBuilder) {
        return inventoryCategoryOrder.map(categoryKey => ({
            title: inventoryCategoryLabels[categoryKey],
            rows: entryList.filter(collectionEntry => collectionEntry.category === categoryKey).map(collectionEntry => ({
                key: buildEntryPickerKey(collectionEntry),
                name: collectionEntry.displayName,
                subtitle: subtitleBuilder(collectionEntry),
                previewUrl: collectionEntry.previewUrl
            }))
        }));
    }

    function downloadJsonFile(jsonPayload, fileName) {
        const jsonBlob = new Blob([JSON.stringify(jsonPayload, null, 4)], { type: 'application/json' });
        return triggerDirectDownload(jsonBlob, fileName);
    }

    function renderInventoryItemOptions() {
        inventoryPicker.render(buildEntryPickerSections(getFilteredInventoryEntries(true), inventoryEntry => (
            inventoryEntry.isUnpublished ? `${inventoryCategoryLabels[inventoryEntry.category]} • removed from shop` : inventoryCategoryLabels[inventoryEntry.category]
        )));
    }

    function refreshInventoryView(shouldRenderOptions = true) {
        const isSingleMode = inventoryEl.mode.value === 'single';
        inventoryEl.singleWrap.classList.toggle('rw-hidden', !isSingleMode);
        const countsByCategory = { avatars: 0, profiles: 0, frames: 0, nameplates: 0 };
        inventoryEntries.forEach(inventoryEntry => { countsByCategory[inventoryEntry.category]++; });
        inventoryEl.ownedAvatars.innerText = countsByCategory.avatars;
        inventoryEl.ownedProfiles.innerText = countsByCategory.profiles;
        inventoryEl.ownedFrames.innerText = countsByCategory.frames;
        inventoryEl.ownedNameplates.innerText = countsByCategory.nameplates;
        inventoryEl.unpublished.innerText = inventoryEntries.filter(inventoryEntry => inventoryEntry.isUnpublished).length;
        if (isSingleMode && shouldRenderOptions) renderInventoryItemOptions();
        const selectedCount = isSingleMode ? (inventoryPicker.getSelectedKey() ? 1 : 0) : getFilteredInventoryEntries(false).length;
        inventoryEl.selected.innerText = selectedCount;
        inventoryEl.downloaded.innerText = inventoryDownloadedTotal;
        inventoryEl.downloadBtn.disabled = inventoryIsDownloading || inventoryEntries.length === 0 || selectedCount === 0;
        inventoryEl.exportBtn.disabled = inventoryEntries.length === 0;
        inventoryEl.downloadBtn.innerText = isSingleMode ? 'Download Selected Asset' : 'Download Inventory';
    }

    function setInventoryStatus(statusText, statusTone = 'neutral') {
        inventoryEl.status.innerText = statusText;
        inventoryEl.status.dataset.tone = statusTone;
    }

    async function loadOwnedInventory() {
        if (inventoryIsLoading || inventoryIsDownloading) return;
        inventoryIsLoading = true;
        inventoryEl.loadBtn.disabled = true;
        inventoryEl.loadBtn.innerText = 'Loading...';
        setInventoryStatus('Loading your owned collectibles...');
        try {
            const token = getDiscordToken();
            if (!token) throw new Error('Auth token not found');
            const inventoryResponse = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/users/@me/collectibles-purchases?variants_return_style=2`, token);
            if (inventoryResponse.status === 401 || inventoryResponse.status === 403) throw new Error('Session not authorized');
            if (!inventoryResponse.ok) throw new Error(`HTTP ${inventoryResponse.status}`);
            const inventoryPayload = await inventoryResponse.json();
            const rawPurchaseList = Array.isArray(inventoryPayload) ? inventoryPayload : (Array.isArray(inventoryPayload.purchases) ? inventoryPayload.purchases : []);
            inventoryEntries = normalizeInventoryPurchases(rawPurchaseList);
            setInventoryStatus(`Loaded ${formatItemCount(inventoryEntries.length, 'owned asset', 'owned assets')}.`, 'success');
            inventoryEl.loadBtn.innerText = 'Reload Inventory';
        } catch (err) {
            rwError("Inventory load failed", err);
            setInventoryStatus(`Could not load inventory: ${err.message}`, 'error');
            showNotification("Inventory could not be loaded. Make sure you are logged in.");
            inventoryEl.loadBtn.innerText = 'Load Inventory';
        } finally {
            inventoryIsLoading = false;
            inventoryEl.loadBtn.disabled = false;
            refreshInventoryView();
        }
    }

    async function downloadInventorySelection() {
        if (inventoryIsDownloading || inventoryEntries.length === 0) return;
        const isSingleMode = inventoryEl.mode.value === 'single';
        let selectedEntries = [];
        if (isSingleMode) {
            const selectedValue = inventoryPicker.getSelectedKey();
            const isSelectionValid = setInputValidationState(inventoryEl.itemSelect, Boolean(selectedValue));
            if (!isSelectionValid) return showNotification("Select an asset from the list first.");
            selectedEntries = inventoryEntries.filter(inventoryEntry => buildEntryPickerKey(inventoryEntry) === selectedValue);
        } else {
            selectedEntries = getFilteredInventoryEntries(false);
        }
        if (selectedEntries.length === 0) return showNotification("No owned assets match the current selection.");

        inventoryIsDownloading = true;
        inventoryEl.loadBtn.disabled = true;
        refreshInventoryView();
        const delayRange = readDownloadDelayRange();
        const zipArchive = new LabsZip();
        let hasZipFiles = false;
        let downloadedItems = 0;
        let failedItems = 0;
        updateProgressBar('rw-inv', 0, `0% (0/${selectedEntries.length})`);

        try {
            for (const inventoryEntry of selectedEntries) {
                try {
                    if (await saveCollectibleItem(inventoryEntry.downloadEntry, zipArchive, delayRange)) hasZipFiles = true;
                    downloadedItems++;
                    inventoryDownloadedTotal++;
                } catch (itemErr) {
                    failedItems++;
                    rwError(`Inventory item download failed: ${inventoryEntry.displayName}`, itemErr);
                }
                const processedItems = downloadedItems + failedItems;
                updateProgressBar('rw-inv', (processedItems / selectedEntries.length) * 100, `${Math.round((processedItems / selectedEntries.length) * 100)}% (${processedItems}/${selectedEntries.length})`);
                inventoryEl.downloaded.innerText = inventoryDownloadedTotal;
            }
            if (hasZipFiles) {
                const zipFilePrefix = isSingleMode && selectedEntries.length === 1 ? getSafeFileName(selectedEntries[0].downloadEntry.itemName) : 'discord_inventory_assets';
                deliverZipArchive(zipArchive, `${zipFilePrefix}_${Date.now()}.zip`);
            }
            const inventoryResultText = `Downloaded ${formatItemCount(downloadedItems, 'owned asset', 'owned assets')}`;
            const resultMessage = failedItems > 0 ? `${inventoryResultText}, ${failedItems} failed.` : `${inventoryResultText}!`;
            setInventoryStatus(resultMessage, failedItems > 0 ? 'error' : 'success');
            showNotification(resultMessage, failedItems === 0);
        } catch (err) {
            rwError("Inventory download failed", err);
            setInventoryStatus('Inventory download encountered an error.', 'error');
            showNotification("Inventory download encountered an error.");
        } finally {
            inventoryIsDownloading = false;
            inventoryEl.loadBtn.disabled = false;
            setTimeout(() => hideProgressBar('rw-inv'), 4000);
            refreshInventoryView();
        }
    }

    const inventoryPicker = createAssetPicker(inventoryEl.itemSelect, () => refreshInventoryView(false));
    inventoryEl.loadBtn.addEventListener('click', loadOwnedInventory);
    inventoryEl.downloadBtn.addEventListener('click', downloadInventorySelection);
    inventoryEl.exportBtn.addEventListener('click', () => {
        if (inventoryEntries.length === 0) return showNotification("Load your inventory first.");
        downloadJsonFile({ exported_at: new Date().toISOString(), owned_asset_count: inventoryEntries.length, owned_assets: buildEntryListExport(inventoryEntries) }, `discord_inventory_list_${Date.now()}.json`);
        showNotification(`Exported ${formatItemCount(inventoryEntries.length, 'inventory entry', 'inventory entries')}.`, true);
    });
    [inventoryEl.mode, inventoryEl.category, inventoryEl.unpublishedOnly].forEach(controlNode => controlNode.addEventListener('change', () => refreshInventoryView(true)));
    inventoryEl.search.addEventListener('input', () => refreshInventoryView(true));

    const questEl = {
        mode: document.getElementById('rw-quest-mode'),
        category: document.getElementById('rw-quest-category'),
        activeOnly: document.getElementById('rw-quest-active-only'),
        singleWrap: document.getElementById('rw-quest-single-wrap'),
        search: document.getElementById('rw-quest-search'),
        itemList: document.getElementById('rw-quest-item'),
        total: document.getElementById('rw-quest-total'),
        rewards: document.getElementById('rw-quest-rewards'),
        avatarsProfiles: document.getElementById('rw-quest-avatars-profiles'),
        framesNameplates: document.getElementById('rw-quest-frames-nameplates'),
        selected: document.getElementById('rw-quest-selected'),
        downloaded: document.getElementById('rw-quest-downloaded'),
        status: document.getElementById('rw-quest-status'),
        loadBtn: document.getElementById('rw-quest-load-btn'),
        exportBtn: document.getElementById('rw-quest-export-btn'),
        downloadBtn: document.getElementById('rw-quest-dl-btn')
    };
    let questEntries = [];
    let questTotalCount = 0;
    let questIsLoading = false;
    let questIsDownloading = false;
    let questDownloadedTotal = 0;

    function setQuestStatus(statusText, statusTone = 'neutral') {
        questEl.status.innerText = statusText;
        questEl.status.dataset.tone = statusTone;
    }

    function extractQuestCollectibleRewards(questPayload) {
        const questList = Array.isArray(questPayload && questPayload.quests) ? questPayload.quests : [];
        const rewardsBySku = new Map();
        questList.forEach(questData => {
            const questConfig = questData && questData.config ? questData.config : null;
            const questRewards = questConfig && questConfig.rewards_config && Array.isArray(questConfig.rewards_config.rewards) ? questConfig.rewards_config.rewards : [];
            questRewards.forEach(questReward => {
                if (!questReward || questReward.type !== 3 || !isValidSnowflakeId(questReward.sku_id)) return;
                const expiresAtMs = Date.parse(questConfig.expires_at || '');
                const rewardInfo = {
                    skuId: String(questReward.sku_id),
                    questId: String(questData.id || questConfig.id || ''),
                    questName: String((questConfig.messages && questConfig.messages.quest_name) || 'Unknown Quest'),
                    rewardName: String((questReward.messages && questReward.messages.name) || ''),
                    questExpiresAt: questConfig.expires_at || null,
                    isQuestActive: Number.isFinite(expiresAtMs) ? expiresAtMs > Date.now() : true
                };
                const existingReward = rewardsBySku.get(rewardInfo.skuId);
                if (!existingReward || (!existingReward.isQuestActive && rewardInfo.isQuestActive)) rewardsBySku.set(rewardInfo.skuId, rewardInfo);
            });
        });
        return { questCount: questList.length, rewards: Array.from(rewardsBySku.values()) };
    }

    function getFilteredQuestEntries(applySearchFilter) {
        const selectedCategory = questEl.category.value;
        const onlyActive = questEl.activeOnly.checked;
        const searchTerm = applySearchFilter ? questEl.search.value.trim().toLowerCase() : '';
        return questEntries.filter(questEntry => {
            if (selectedCategory !== 'all' && questEntry.category !== selectedCategory) return false;
            if (onlyActive && !questEntry.questInfo.isQuestActive) return false;
            if (searchTerm && !`${questEntry.displayName} ${questEntry.questInfo.questName}`.toLowerCase().includes(searchTerm)) return false;
            return true;
        });
    }

    function refreshQuestView(shouldRenderOptions = true) {
        const isSingleMode = questEl.mode.value === 'single';
        questEl.singleWrap.classList.toggle('rw-hidden', !isSingleMode);
        const countsByCategory = { avatars: 0, profiles: 0, frames: 0, nameplates: 0 };
        questEntries.forEach(questEntry => { countsByCategory[questEntry.category]++; });
        questEl.total.innerText = questTotalCount;
        questEl.rewards.innerText = questEntries.length;
        questEl.avatarsProfiles.innerText = `${countsByCategory.avatars} / ${countsByCategory.profiles}`;
        questEl.framesNameplates.innerText = `${countsByCategory.frames} / ${countsByCategory.nameplates}`;
        if (isSingleMode && shouldRenderOptions) {
            questPicker.render(buildEntryPickerSections(getFilteredQuestEntries(true), questEntry => (
                `Quest: ${questEntry.questInfo.questName}${questEntry.questInfo.isQuestActive ? '' : ' • expired'}`
            )));
        }
        const selectedCount = isSingleMode ? (questPicker.getSelectedKey() ? 1 : 0) : getFilteredQuestEntries(false).length;
        questEl.selected.innerText = selectedCount;
        questEl.downloaded.innerText = questDownloadedTotal;
        questEl.downloadBtn.disabled = questIsDownloading || questIsLoading || questEntries.length === 0 || selectedCount === 0;
        questEl.exportBtn.disabled = questEntries.length === 0;
        questEl.downloadBtn.innerText = isSingleMode ? 'Download Selected Reward' : 'Download Rewards';
    }

    async function loadQuestRewards() {
        if (questIsLoading || questIsDownloading) return;
        questIsLoading = true;
        questEl.loadBtn.disabled = true;
        questEl.loadBtn.innerText = 'Loading...';
        setQuestStatus('Loading quests...');
        refreshQuestView(false);
        try {
            const token = getDiscordToken();
            if (!token) throw new Error('Auth token not found');
            const questResponse = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/quests/@me`, token);
            if (questResponse.status === 401 || questResponse.status === 403) throw new Error('Session not authorized');
            if (!questResponse.ok) throw new Error(`HTTP ${questResponse.status}`);
            const { questCount, rewards } = extractQuestCollectibleRewards(await questResponse.json());
            questTotalCount = questCount;
            const resolvedProducts = [];
            const questInfoBySku = new Map();
            let failedRewards = 0;
            for (let rewardIndex = 0; rewardIndex < rewards.length; rewardIndex++) {
                const rewardInfo = rewards[rewardIndex];
                setQuestStatus(`Resolving quest reward ${rewardIndex + 1}/${rewards.length}...`);
                const wasCached = collectibleProductCache.has(rewardInfo.skuId);
                try {
                    const rewardProduct = await fetchCollectibleProduct(rewardInfo.skuId, token);
                    resolvedProducts.push(rewardProduct);
                    questInfoBySku.set(rewardInfo.skuId, rewardInfo);
                } catch (rewardErr) {
                    failedRewards++;
                    rwError(`Quest reward lookup failed: ${rewardInfo.rewardName}`, rewardErr);
                }
                if (!wasCached && rewardIndex < rewards.length - 1) await sleepWithConfiguredDelay();
            }
            questEntries = normalizeInventoryPurchases(resolvedProducts)
                .filter(questEntry => questInfoBySku.has(questEntry.skuId))
                .map(questEntry => Object.assign(questEntry, { questInfo: questInfoBySku.get(questEntry.skuId) }));
            const loadedText = `Found ${formatItemCount(questEntries.length, 'collectible reward', 'collectible rewards')} in ${formatItemCount(questCount, 'quest', 'quests')}`;
            setQuestStatus(failedRewards > 0 ? `${loadedText}, ${failedRewards} could not be resolved.` : `${loadedText}.`, failedRewards > 0 ? 'error' : 'success');
            questEl.loadBtn.innerText = 'Reload Quests';
        } catch (err) {
            rwError("Quest load failed", err);
            setQuestStatus(`Could not load quests: ${err.message}`, 'error');
            showNotification("Quests could not be loaded. Make sure you are logged in.");
            questEl.loadBtn.innerText = 'Load Quests';
        } finally {
            questIsLoading = false;
            questEl.loadBtn.disabled = false;
            refreshQuestView();
        }
    }

    async function downloadQuestSelection() {
        if (questIsDownloading || questEntries.length === 0) return;
        const isSingleMode = questEl.mode.value === 'single';
        let selectedEntries = [];
        if (isSingleMode) {
            const selectedValue = questPicker.getSelectedKey();
            if (!setInputValidationState(questEl.itemList, Boolean(selectedValue))) return showNotification("Select a quest reward from the list first.");
            selectedEntries = questEntries.filter(questEntry => buildEntryPickerKey(questEntry) === selectedValue);
        } else {
            selectedEntries = getFilteredQuestEntries(false);
        }
        if (selectedEntries.length === 0) return showNotification("No quest rewards match the current selection.");

        questIsDownloading = true;
        questEl.loadBtn.disabled = true;
        refreshQuestView(false);
        const delayRange = readDownloadDelayRange();
        const zipArchive = new LabsZip();
        let hasZipFiles = false;
        let downloadedItems = 0;
        let failedItems = 0;
        updateProgressBar('rw-quest', 0, `0% (0/${selectedEntries.length})`);

        try {
            for (const questEntry of selectedEntries) {
                try {
                    if (await saveCollectibleItem(questEntry.downloadEntry, zipArchive, delayRange)) hasZipFiles = true;
                    downloadedItems++;
                    questDownloadedTotal++;
                } catch (itemErr) {
                    failedItems++;
                    rwError(`Quest reward download failed: ${questEntry.displayName}`, itemErr);
                }
                const processedItems = downloadedItems + failedItems;
                updateProgressBar('rw-quest', (processedItems / selectedEntries.length) * 100, `${Math.round((processedItems / selectedEntries.length) * 100)}% (${processedItems}/${selectedEntries.length})`);
                questEl.downloaded.innerText = questDownloadedTotal;
            }
            if (hasZipFiles) {
                const zipFilePrefix = isSingleMode && selectedEntries.length === 1 ? getSafeFileName(selectedEntries[0].downloadEntry.itemName) : 'discord_quest_rewards';
                deliverZipArchive(zipArchive, `${zipFilePrefix}_${Date.now()}.zip`);
            }
            const questResultText = `Downloaded ${formatItemCount(downloadedItems, 'quest reward', 'quest rewards')}`;
            const resultMessage = failedItems > 0 ? `${questResultText}, ${failedItems} failed.` : `${questResultText}!`;
            setQuestStatus(resultMessage, failedItems > 0 ? 'error' : 'success');
            showNotification(resultMessage, failedItems === 0);
        } catch (err) {
            rwError("Quest reward download failed", err);
            setQuestStatus('Quest reward download encountered an error.', 'error');
            showNotification("Quest reward download encountered an error.");
        } finally {
            questIsDownloading = false;
            questEl.loadBtn.disabled = false;
            setTimeout(() => hideProgressBar('rw-quest'), 4000);
            refreshQuestView();
        }
    }

    const questPicker = createAssetPicker(questEl.itemList, () => refreshQuestView(false));
    questEl.loadBtn.addEventListener('click', loadQuestRewards);
    questEl.downloadBtn.addEventListener('click', downloadQuestSelection);
    questEl.exportBtn.addEventListener('click', () => {
        if (questEntries.length === 0) return showNotification("Load quests first.");
        downloadJsonFile({
            exported_at: new Date().toISOString(),
            quest_count: questTotalCount,
            collectible_reward_count: questEntries.length,
            collectible_rewards: buildEntryListExport(questEntries, questEntry => ({
                quest_id: questEntry.questInfo.questId,
                quest_name: questEntry.questInfo.questName,
                reward_name: questEntry.questInfo.rewardName,
                quest_expires_at: questEntry.questInfo.questExpiresAt,
                quest_active: questEntry.questInfo.isQuestActive
            }))
        }, `discord_quest_rewards_list_${Date.now()}.json`);
        showNotification(`Exported ${formatItemCount(questEntries.length, 'quest reward', 'quest rewards')}.`, true);
    });
    [questEl.mode, questEl.category, questEl.activeOnly].forEach(controlNode => controlNode.addEventListener('change', () => refreshQuestView(true)));
    questEl.search.addEventListener('input', () => refreshQuestView(true));

    const emojiModeSelect = document.getElementById('rw-emoji-mode');
    const emSingleWrap = document.getElementById('rw-emoji-single-wrap');
    const emMultipleWrap = document.getElementById('rw-emoji-multiple-wrap');
    const emServerWrap = document.getElementById('rw-emoji-server-wrap');
    const emSingleId = document.getElementById('rw-emoji-single-id');
    const emMultiIds = document.getElementById('rw-emoji-multiple-ids');
    const emServerId = document.getElementById('rw-emoji-server-id');
    const emFound = document.getElementById('rw-emoji-found');
    const emDlBtn = document.getElementById('rw-emoji-dl-btn');

    emojiModeSelect.addEventListener('change', (event) => {
        emSingleWrap.classList.add('rw-hidden');
        emMultipleWrap.classList.add('rw-hidden');
        emServerWrap.classList.add('rw-hidden');
        const selectedEmojiMode = event.target.value;
        if (selectedEmojiMode === 'single') emSingleWrap.classList.remove('rw-hidden');
        if (selectedEmojiMode === 'multiple') emMultipleWrap.classList.remove('rw-hidden');
        if (selectedEmojiMode === 'server' || selectedEmojiMode === 'stickers') {
            emServerWrap.classList.remove('rw-hidden');
            document.getElementById('rw-emoji-found-label').innerText = selectedEmojiMode === 'stickers' ? 'Stickers Found' : 'Emojis Found';
            emDlBtn.innerText = selectedEmojiMode === 'stickers' ? 'Download Stickers' : 'Download Emojis';
            emojiLookupGuildId = null;
            emojiLookupSequence++;
            emFound.innerText = '0';
            emDlBtn.dataset.emojis = "[]";
            emServerId.dispatchEvent(new Event('input'));
        } else {
            emDlBtn.innerText = 'Download Emojis';
        }
    });

    async function fetchServerStickersList(guildId) {
        const token = getDiscordToken();
        if (!token) throw new Error("Missing Auth Token");
        const stickersRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/guilds/${guildId}/stickers`, token);
        if (!stickersRes.ok) throw new Error(`API ${stickersRes.status}`);
        const stickersArray = await stickersRes.json();
        return Array.isArray(stickersArray) ? stickersArray : [];
    }

    function parseEmojiString(rawInput) {
        const trimmed = rawInput.trim();
        const tagMatch = trimmed.match(/<(a)?:([^:]+):(\d{15,22})>/);
        if (tagMatch) {
            return { id: tagMatch[3], name: getSafeFileName(tagMatch[2]), animated: Boolean(tagMatch[1]) };
        }
        const cdnMatch = trimmed.match(/emojis\/(\d{15,22})\.(gif|webp|png)/i);
        if (cdnMatch) {
            return { id: cdnMatch[1], name: cdnMatch[1], animated: cdnMatch[2].toLowerCase() === 'gif' };
        }
        const idMatch = trimmed.match(/^(\d{15,22})$/);
        if (idMatch) {
            return { id: idMatch[1], name: idMatch[1], animated: null };
        }
        return null;
    }

    emSingleId.addEventListener('input', () => {
        const val = emSingleId.value.trim();
        setInputValidationState(emSingleId, val === '' || Boolean(parseEmojiString(val)));
    });

    emMultiIds.addEventListener('input', () => {
        const lines = emMultiIds.value.split('\n').map(line => line.trim()).filter(Boolean);
        const allValid = lines.length === 0 || lines.every(line => Boolean(parseEmojiString(line)));
        setInputValidationState(emMultiIds, allValid);
    });

    async function fetchServerEmojisList(guildId) {
        const stores = getDiscordWebpackStores();
        if (stores.emojiStore && typeof stores.emojiStore.getGuildEmoji === 'function') {
            try {
                const cachedEmojis = stores.emojiStore.getGuildEmoji(guildId);
                if (Array.isArray(cachedEmojis) && cachedEmojis.length > 0) {
                    return cachedEmojis;
                }
            } catch (err) {}
        }
        const token = getDiscordToken();
        if (!token) throw new Error("Missing Auth Token");

        const emojisRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/guilds/${guildId}/emojis`, token);
        if (emojisRes.ok) {
            const emojisArray = await emojisRes.json();
            if (Array.isArray(emojisArray)) return emojisArray;
        }

        const guildRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/guilds/${guildId}`, token);
        if (guildRes.ok) {
            const guildData = await guildRes.json();
            return Array.isArray(guildData.emojis) ? guildData.emojis : [];
        }
        throw new Error(`API ${guildRes.status}`);
    }

    let emojiLookupTimer = null;
    let emojiLookupGuildId = null;
    let emojiLookupSequence = 0;

    async function lookupServerEmojis(guildId) {
        const lookupSequence = ++emojiLookupSequence;
        emFound.innerText = '...';
        try {
            const emojisList = emojiModeSelect.value === 'stickers' ? await fetchServerStickersList(guildId) : await fetchServerEmojisList(guildId);
            if (lookupSequence !== emojiLookupSequence) return;
            emFound.innerText = emojisList.length;
            emDlBtn.dataset.emojis = JSON.stringify(emojisList);
            emDlBtn.dataset.guildId = guildId;
        } catch (err) {
            if (lookupSequence !== emojiLookupSequence) return;
            rwError("Server emoji lookup failed", err);
            emFound.innerText = "Error";
            emDlBtn.dataset.emojis = "[]";
            emojiLookupGuildId = null;
        }
    }

    emServerId.addEventListener('input', (event) => {
        const rawVal = event.target.value.trim();
        const guildId = extractSnowflakeId(rawVal);
        setInputValidationState(emServerId, rawVal === '' || Boolean(guildId));
        clearTimeout(emojiLookupTimer);

        if (!guildId) {
            emojiLookupGuildId = null;
            emojiLookupSequence++;
            emFound.innerText = '0';
            emDlBtn.dataset.emojis = "[]";
            return;
        }
        if (guildId === emojiLookupGuildId) return;
        emojiLookupTimer = setTimeout(() => {
            emojiLookupGuildId = guildId;
            lookupServerEmojis(guildId);
        }, 700);
    });

    async function downloadSingleEmojiAsset(emojiItem) {
        const extensionsToTry = emojiItem.animated === true
            ? ['gif', 'webp', 'png']
            : emojiItem.animated === false
                ? ['png', 'webp']
                : ['gif', 'png', 'webp'];

        for (const ext of extensionsToTry) {
            try {
                const response = await fetch(`https://cdn.discordapp.com/emojis/${emojiItem.id}.${ext}?size=1024&quality=lossless`);
                if (response.ok) {
                    const blob = await response.blob();
                    return { blob, ext };
                }
            } catch (err) {}
        }
        return null;
    }

    emDlBtn.addEventListener('click', async () => {
        const mode = emojiModeSelect.value;
        let emojisToDownload = [];
        let zipBaseName = 'discord_emojis';

        if (mode === 'single') {
            const parsed = parseEmojiString(emSingleId.value);
            if (!setInputValidationState(emSingleId, Boolean(parsed))) {
                return showNotification("Please enter a valid Emoji ID or <a:name:id>");
            }
            emojisToDownload.push(parsed);
        } else if (mode === 'multiple') {
            const lines = emMultiIds.value.split('\n').map(line => line.trim()).filter(Boolean);
            const parsedList = lines.map(parseEmojiString);
            if (parsedList.length === 0 || parsedList.some(item => !item)) {
                setInputValidationState(emMultiIds, false);
                return showNotification("Please enter valid Emoji IDs (one per line)");
            }
            setInputValidationState(emMultiIds, true);
            emojisToDownload = parsedList.map(item => ({
                id: item.id,
                name: item.name === item.id ? item.id : `${item.name}_${item.id}`,
                animated: item.animated
            }));
        } else if (mode === 'server') {
            const guildId = extractSnowflakeId(emServerId.value);
            if (!setInputValidationState(emServerId, Boolean(guildId))) {
                return showNotification("Please enter a valid Server ID");
            }
            zipBaseName = `${guildId}_discord_emojis`;
            try {
                let serverEmojis = [];
                if (emDlBtn.dataset.guildId === guildId && emDlBtn.dataset.emojis) {
                    serverEmojis = JSON.parse(emDlBtn.dataset.emojis);
                }
                if (!Array.isArray(serverEmojis) || serverEmojis.length === 0) {
                    serverEmojis = await fetchServerEmojisList(guildId);
                    emFound.innerText = serverEmojis.length;
                }
                if (serverEmojis.length === 0) {
                    return showNotification("No Emojis found on this server");
                }
                emojisToDownload = serverEmojis.map(emoji => ({
                    id: emoji.id,
                    name: `${getSafeFileName(emoji.name)}_${emoji.id}`,
                    animated: Boolean(emoji.animated)
                }));
            } catch (err) {
                return showNotification("Failed to fetch Server Emojis");
            }
        } else if (mode === 'stickers') {
            const guildId = extractSnowflakeId(emServerId.value);
            if (!setInputValidationState(emServerId, Boolean(guildId))) {
                return showNotification("Please enter a valid Server ID");
            }
            try {
                emDlBtn.disabled = true;
                emDlBtn.innerText = "Downloading Stickers...";
                let serverStickers = [];
                if (emDlBtn.dataset.guildId === guildId && emDlBtn.dataset.emojis) serverStickers = JSON.parse(emDlBtn.dataset.emojis);
                if (!Array.isArray(serverStickers) || serverStickers.length === 0) {
                    serverStickers = await fetchServerStickersList(guildId);
                    emFound.innerText = serverStickers.length;
                }
                if (serverStickers.length === 0) return showNotification("No Stickers found on this server");
                const stickerZip = new LabsZip();
                updateProgressBar('rw-emoji', 0, `0% (0/${serverStickers.length})`);
                const savedStickerCount = await appendStickersToZip(serverStickers, stickerZip, 'Stickers');
                updateProgressBar('rw-emoji', 100, `100% (${savedStickerCount}/${serverStickers.length})`);
                if (savedStickerCount === 0) return showNotification("No Stickers could be downloaded.");
                deliverZipArchive(stickerZip, `${guildId}_discord_stickers.zip`);
                showNotification(`Downloaded ${formatItemCount(savedStickerCount, 'sticker', 'stickers')}!`, true);
            } catch (err) {
                rwError("Sticker download failed", err);
                showNotification("Failed to download Server Stickers");
            } finally {
                setTimeout(() => hideProgressBar('rw-emoji'), 2000);
                emDlBtn.disabled = false;
                emDlBtn.innerText = "Download Stickers";
            }
            return;
        }

        try {
            emDlBtn.disabled = true;
            emDlBtn.innerText = "Downloading Emojis...";

            if (mode === 'single') {
                const targetEmoji = emojisToDownload[0];
                const result = await downloadSingleEmojiAsset(targetEmoji);
                if (result) {
                    await saveOutputFile(result.blob, `${targetEmoji.name}.${result.ext}`);
                    showNotification("Emoji Downloaded!", true);
                } else {
                    showNotification(`Emoji ${targetEmoji.id} not found.`);
                }
            } else {
                const zip = new LabsZip();
                let downloadedCount = 0;

                for (let index = 0; index < emojisToDownload.length; index++) {
                    const emojiItem = emojisToDownload[index];
                    const result = await downloadSingleEmojiAsset(emojiItem);
                    if (result) {
                        const uint8Buffer = new Uint8Array(await result.blob.arrayBuffer());
                        zip.addFile(`Emojis/${emojiItem.name}.${result.ext}`, uint8Buffer);
                        downloadedCount++;
                    }
                    const pct = Math.round(((index + 1) / emojisToDownload.length) * 100);
                    updateProgressBar('rw-emoji', pct, `${pct}% (${index + 1}/${emojisToDownload.length})`);
                    if (index % 5 === 4) await sleep(150);
                }

                if (downloadedCount > 0) {
                    emDlBtn.innerText = "Packaging ZIP...";
                    const zipBlob = zip.generate();
                    await saveOutputFile(zipBlob, `${zipBaseName}.zip`);
                    showNotification(`Downloaded ${downloadedCount} Emojis!`, true);
                } else {
                    showNotification("No Emojis could be downloaded.");
                }
                setTimeout(() => hideProgressBar('rw-emoji'), 2000);
            }
        } catch (err) {
            showNotification("Emoji download failed.");
        } finally {
            emDlBtn.disabled = false;
            emDlBtn.innerText = "Download Emojis";
        }
    });

    const usrModeSelect = document.getElementById('rw-user-mode');
    const usrDlBtn = document.getElementById('rw-user-dl-btn');
    const usrTargetId = document.getElementById('rw-user-target-id');
    const usrResolved = document.getElementById('rw-user-resolved');
    const usrTargetWrap = document.getElementById('rw-user-target-wrap');
    const usrManualWrap = document.getElementById('rw-user-manual-wrap');
    const usrStartRecordBtn = document.getElementById('rw-user-start-record');
    const usrStopRecordBtn = document.getElementById('rw-user-stop-record');

    let manualScanIntervalId = null;
    let manualScanScheduled = false;
    const manualCapturedIds = new Set();
    let isManualRecording = false;

    function findMemberListScroller() {
        const scrollerSelectors = [
            '[data-list-id="members"]',
            '[role="list"][aria-label*="Members" i]',
            '[class*="membersWrap"] [class*="scroller"]',
            '[class*="members_"]'
        ];
        for (const selector of scrollerSelectors) {
            const listNode = document.querySelector(selector);
            if (!listNode) continue;
            let currentNode = listNode;
            while (currentNode && currentNode !== document.body) {
                const overflowValue = window.getComputedStyle(currentNode).overflowY;
                const isScrollable = overflowValue === 'auto' || overflowValue === 'scroll' || overflowValue === 'overlay';
                if (isScrollable && currentNode.scrollHeight > currentNode.clientHeight) return currentNode;
                currentNode = currentNode.parentElement;
            }
            const innerScroller = listNode.querySelector('[class*="scroller"]');
            if (innerScroller && innerScroller.scrollHeight > innerScroller.clientHeight) return innerScroller;
        }
        return null;
    }

    function collectUserIdsFromDom(rootNode, targetIdSet) {
        rootNode.querySelectorAll('[data-list-item-id*="members"]').forEach(listItem => {
            const idMatch = (listItem.getAttribute('data-list-item-id') || '').match(/(\d{15,22})/);
            if (idMatch) targetIdSet.add(idMatch[1]);
        });
        rootNode.querySelectorAll('img[src*="/avatars/"]').forEach(avatarImage => {
            const idMatch = avatarImage.src.match(/\/avatars\/(\d{15,22})\//);
            if (idMatch) targetIdSet.add(idMatch[1]);
        });
    }

    function scanManualCapture() {
        try {
            const memberListScroller = findMemberListScroller();
            collectUserIdsFromDom(memberListScroller || document, manualCapturedIds);
            usrResolved.innerText = manualCapturedIds.size;
        } catch (err) {
            rwError("Manual member scan failed", err);
        }
    }

    function handleManualScroll() {
        if (!isManualRecording || manualScanScheduled) return;
        manualScanScheduled = true;
        setTimeout(() => {
            manualScanScheduled = false;
            scanManualCapture();
        }, 120);
    }

    function stopManualCapture() {
        isManualRecording = false;
        manualScanScheduled = false;
        if (manualScanIntervalId !== null) {
            clearInterval(manualScanIntervalId);
            manualScanIntervalId = null;
        }
        document.removeEventListener('scroll', handleManualScroll, { capture: true });
    }

    async function waitForMemberListPlaceholders(memberListScroller) {
        for (let waitRound = 0; waitRound < 8; waitRound++) {
            const hasPendingPlaceholders = memberListScroller.querySelector('[class*="placeholder"], [class*="skeleton"], [class*="loading"]');
            if (!hasPendingPlaceholders) return;
            await sleep(500);
        }
    }

    async function autoScrollMemberList(expectedGuildId, collectedIdSet) {
        try {
            const pathMatch = window.location.pathname.match(/^\/channels\/(\d{15,22})/);
            if (!pathMatch || pathMatch[1] !== expectedGuildId) {
                showNotification("Open the target server in Discord to enable member list auto scroll.");
                return false;
            }
            const memberListScroller = findMemberListScroller();
            if (!memberListScroller) {
                showNotification("Member list not found. Open the member list and try again.");
                return false;
            }
            const originalScrollTop = memberListScroller.scrollTop;
            let stagnantRounds = 0;
            memberListScroller.scrollTop = 0;
            await sleep(1500);
            for (let stepIndex = 0; stepIndex < 8000; stepIndex++) {
                collectUserIdsFromDom(memberListScroller, collectedIdSet);
                usrResolved.innerText = collectedIdSet.size;
                const previousScrollTop = memberListScroller.scrollTop;
                const maxScrollTop = memberListScroller.scrollHeight - memberListScroller.clientHeight;
                if (previousScrollTop >= maxScrollTop - 2) {
                    await sleep(randomJitter(1500, 2200));
                    await waitForMemberListPlaceholders(memberListScroller);
                    collectUserIdsFromDom(memberListScroller, collectedIdSet);
                    usrResolved.innerText = collectedIdSet.size;
                    break;
                }
                memberListScroller.scrollTop = previousScrollTop + Math.max(100, Math.floor(memberListScroller.clientHeight * 0.5));
                await sleep(randomJitter(900, 1400));
                await waitForMemberListPlaceholders(memberListScroller);
                if (memberListScroller.scrollTop === previousScrollTop) {
                    stagnantRounds++;
                    if (stagnantRounds >= 5) break;
                } else {
                    stagnantRounds = 0;
                }
            }
            memberListScroller.scrollTop = originalScrollTop;
            return true;
        } catch (err) {
            rwError("Member list auto scroll failed", err);
            return false;
        }
    }

    usrModeSelect.addEventListener('change', (event) => {
        usrResolved.innerText = '0';
        const selectedMode = event.target.value;
        usrTargetWrap.classList.remove('rw-hidden');
        usrManualWrap.classList.add('rw-hidden');
        usrDlBtn.style.display = 'block';

        if (selectedMode === 'single') usrTargetId.placeholder = "Enter Target ID: (User ID)";
        else if (selectedMode === 'channel') usrTargetId.placeholder = "Enter Target ID: (Channel or DM User ID)";
        else if (selectedMode === 'server') usrTargetId.placeholder = "Enter Target ID: (Server ID)";
        else if (selectedMode === 'manual') {
            usrTargetWrap.classList.add('rw-hidden');
            usrManualWrap.classList.remove('rw-hidden');
            usrDlBtn.style.display = 'none';
        }
    });

    usrTargetId.addEventListener('input', () => {
        const raw = usrTargetId.value.trim();
        setInputValidationState(usrTargetId, raw === '' || Boolean(extractSnowflakeId(raw)));
    });

    usrStartRecordBtn.addEventListener('click', () => {
        isManualRecording = true;
        manualCapturedIds.clear();
        usrResolved.innerText = '0';
        usrStartRecordBtn.disabled = true;
        usrStopRecordBtn.disabled = false;
        usrStartRecordBtn.innerText = "Recording...";

        try {
            scanManualCapture();
            manualScanIntervalId = setInterval(scanManualCapture, 400);
            document.addEventListener('scroll', handleManualScroll, { capture: true, passive: true });
        } catch (err) {
            stopManualCapture();
            usrStartRecordBtn.disabled = false;
            usrStopRecordBtn.disabled = true;
            usrStartRecordBtn.innerText = "Start Detection";
            rwError("Manual capture start failed", err);
            showNotification("Could not start detection.");
        }
    });

    usrStopRecordBtn.addEventListener('click', async () => {
        scanManualCapture();
        stopManualCapture();
        usrStartRecordBtn.disabled = false;
        usrStopRecordBtn.disabled = true;
        usrStartRecordBtn.innerText = "Start Detection";
        
        if (manualCapturedIds.size === 0) {
            return showNotification("No users captured.");
        }
        
        const token = getDiscordToken();
        if (!token) return showNotification("Auth Token missing.");

        const manualGuildMatch = window.location.pathname.match(/^\/channels\/(\d{15,22})/);
        await processAndDownloadUsers(Array.from(manualCapturedIds).map(id => ({ id })), token, "manual_server", manualGuildMatch ? manualGuildMatch[1] : null);
    });

    async function resolveDmOrChannelId(targetSnowflake, token) {
        const stores = getDiscordWebpackStores();
        if (stores.channelStore) {
            try {
                const directChannel = stores.channelStore.getChannel(targetSnowflake);
                if (directChannel) return directChannel.id;
                if (typeof stores.channelStore.getDMFromUserId === 'function') {
                    const dmChannelId = stores.channelStore.getDMFromUserId(targetSnowflake);
                    if (dmChannelId) return dmChannelId;
                }
            } catch (err) {}
        }
        try {
            const channelCheck = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/channels/${targetSnowflake}`, token);
            if (channelCheck.ok) return targetSnowflake;

            const dmListRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/users/@me/channels`, token);
            if (dmListRes.ok) {
                const dmChannels = await dmListRes.json();
                if (Array.isArray(dmChannels)) {
                    const matchedDm = dmChannels.find(ch =>
                        ch.id === targetSnowflake ||
                        (Array.isArray(ch.recipients) && ch.recipients.some(recipient => recipient.id === targetSnowflake))
                    );
                    if (matchedDm) return matchedDm.id;
                }
            }
            showNotification("No existing DM or channel found for this ID. Open the DM in Discord first.");
        } catch (err) {
            rwError("DM or channel resolution failed", err);
        }
        return targetSnowflake;
    }

    function enrichUserWithStores(userData, stores) {
        const enriched = { ...userData };
        try {
            if (stores.relationshipStore && typeof stores.relationshipStore.isFriend === 'function') {
                enriched.is_friend = stores.relationshipStore.isFriend(userData.id);
                if (typeof stores.relationshipStore.getSince === 'function') {
                    enriched.friend_since = stores.relationshipStore.getSince(userData.id) || null;
                }
            }
            if (stores.presenceStore && typeof stores.presenceStore.getActivities === 'function') {
                enriched.activities = stores.presenceStore.getActivities(userData.id) || [];
                if (typeof stores.presenceStore.getState === 'function') {
                    const stateObj = stores.presenceStore.getState();
                    if (stateObj && stateObj.statuses && stateObj.statuses[userData.id]) {
                        enriched.status = stateObj.statuses[userData.id];
                    }
                }
            }
        } catch (err) {}
        return enriched;
    }

    async function fetchApiWithRateLimitRetry(requestUrl, token, maxAttempts = 4) {
        let lastResponse = null;
        for (let attemptIndex = 0; attemptIndex < maxAttempts; attemptIndex++) {
            lastResponse = await fetch(requestUrl, { headers: buildClientRequestHeaders(token) });
            if (lastResponse.status !== 429) return lastResponse;
            const retryAfterSeconds = parseFloat(lastResponse.headers.get('Retry-After')) || 2;
            await sleep((retryAfterSeconds * 1000) + randomJitter(300, 900));
        }
        return lastResponse;
    }

    const publicFlagBadgeDefinitions = [
        { flag: 1, id: 'staff', title: 'Discord Staff' },
        { flag: 2, id: 'partner', title: 'Partnered Server Owner' },
        { flag: 4, id: 'hypesquad', title: 'HypeSquad Events' },
        { flag: 8, id: 'bug_hunter_level_1', title: 'Discord Bug Hunter (Tier 1)' },
        { flag: 64, id: 'hypesquad_house_1', title: 'HypeSquad Bravery' },
        { flag: 128, id: 'hypesquad_house_2', title: 'HypeSquad Brilliance' },
        { flag: 256, id: 'hypesquad_house_3', title: 'HypeSquad Balance' },
        { flag: 512, id: 'early_supporter', title: 'Early Supporter' },
        { flag: 16384, id: 'bug_hunter_level_2', title: 'Discord Bug Hunter (Tier 2)' },
        { flag: 65536, id: 'verified_bot', title: 'Verified Bot/App' },
        { flag: 131072, id: 'verified_developer', title: 'Early Verified Bot Developer' },
        { flag: 262144, id: 'certified_moderator', title: 'Moderator Programs Alumni' },
        { flag: 524288, id: 'supports_commands', title: 'Supports Commands' },
        { flag: 4194304, id: 'active_developer', title: 'Active Developer' },
        { flag: 16777216, id: 'uses_automod', title: 'Uses Automod' }
    ];
    const botBadgeFlagMask = 65536n | 524288n | 16777216n;

    function readPublicFlagsValue(userData) {
        try {
            const rawFlags = userData.public_flags ?? userData.publicFlags ?? userData.flags ?? 0;
            return BigInt(rawFlags);
        } catch (err) {
            return 0n;
        }
    }

    function hasBotBadgeFlag(userData) {
        return (readPublicFlagsValue(userData) & botBadgeFlagMask) !== 0n;
    }

    function isBotUser(userData) {
        return Boolean(userData && (userData.bot === true || hasBotBadgeFlag(userData)));
    }

    function attachBadgeReport(userData) {
        const collectedBadges = new Map();
        const apiBadges = Array.isArray(userData.badges) ? userData.badges : [];
        apiBadges.forEach(apiBadge => {
            if (!apiBadge) return;
            const isPlainString = typeof apiBadge === 'string';
            const badgeId = isPlainString ? apiBadge : apiBadge.id;
            if (!badgeId || collectedBadges.has(badgeId)) return;
            const iconHash = isPlainString ? null : (apiBadge.icon || null);
            collectedBadges.set(badgeId, {
                id: badgeId,
                title: isPlainString ? badgeId : (apiBadge.description || badgeId),
                icon: iconHash,
                icon_url: iconHash ? `https://cdn.discordapp.com/badge-icons/${iconHash}.png` : null,
                link: isPlainString ? null : (apiBadge.link || null),
                source: 'profile_badges'
            });
        });

        const flagValue = readPublicFlagsValue(userData);
        publicFlagBadgeDefinitions.forEach(definition => {
            if ((flagValue & BigInt(definition.flag)) !== 0n && !collectedBadges.has(definition.id)) {
                collectedBadges.set(definition.id, { id: definition.id, title: definition.title, icon: null, icon_url: null, link: null, source: 'public_flags' });
            }
        });

        const hasBoosterBadge = Array.from(collectedBadges.keys()).some(badgeId => badgeId.startsWith('guild_booster'));
        if ((userData.premium_type || userData.premium_since) && !collectedBadges.has('premium')) {
            collectedBadges.set('premium', { id: 'premium', title: 'Discord Nitro', icon: null, icon_url: null, link: null, source: 'derived' });
        }
        if (userData.premium_guild_since && !hasBoosterBadge) {
            collectedBadges.set('guild_booster', { id: 'guild_booster', title: 'Server Booster', icon: null, icon_url: null, link: null, source: 'derived' });
        }
        if (userData.legacy_username && !collectedBadges.has('legacy_username')) {
            collectedBadges.set('legacy_username', { id: 'legacy_username', title: `Originally known as ${userData.legacy_username}`, icon: null, icon_url: null, link: null, source: 'derived' });
        }
        if (userData.bot === true && !collectedBadges.has('bot')) {
            collectedBadges.set('bot', { id: 'bot', title: 'Bot/App', icon: null, icon_url: null, link: null, source: 'derived' });
        }

        return { ...userData, all_badges: Array.from(collectedBadges.values()), badge_count: collectedBadges.size };
    }

    async function resolveSingleUserData(userId, token, guildContextId = null) {
        let finalUser = null;
        try {
            let guildQuery = isValidSnowflakeId(guildContextId) ? `&guild_id=${guildContextId}` : '';
            let profileRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/users/${userId}/profile?with_mutual_guilds=true&with_mutual_friends_count=true${guildQuery}`, token);
            if (!profileRes.ok && guildQuery) {
                guildQuery = '';
                await sleepWithConfiguredDelay();
                profileRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/users/${userId}/profile?with_mutual_guilds=true&with_mutual_friends_count=true`, token);
            }
            if (profileRes.ok) {
                const profilePayload = await profileRes.json();
                if (profilePayload && profilePayload.user) {
                    finalUser = {
                        ...profilePayload.user,
                        bio: profilePayload.user_profile?.bio || profilePayload.user.bio || '',
                        pronouns: profilePayload.user_profile?.pronouns || '',
                        banner: profilePayload.user.banner || profilePayload.user_profile?.banner || null,
                        accent_color: profilePayload.user.accent_color || profilePayload.user_profile?.accent_color || null,
                        badges: profilePayload.badges || [],
                        premium_type: profilePayload.premium_type ?? profilePayload.user.premium_type ?? null,
                        premium_since: profilePayload.premium_since ?? null,
                        premium_guild_since: profilePayload.premium_guild_since ?? null,
                        legacy_username: profilePayload.legacy_username ?? null,
                        connected_accounts: profilePayload.connected_accounts || [],
                        mutual_guilds: profilePayload.mutual_guilds || [],
                        mutual_friends_count: profilePayload.mutual_friends_count || 0,
                        theme_colors: profilePayload.user_profile?.theme_colors || null,
                        profile_effect: profilePayload.user_profile?.profile_effect || null,
                        profile_collectibles: Array.isArray(profilePayload.user_profile?.collectibles) ? profilePayload.user_profile.collectibles : [],
                        popout_animation_particle_type: profilePayload.user_profile?.popout_animation_particle_type ?? null,
                        profile_emoji: profilePayload.user_profile?.emoji ?? null,
                        guild_badges: profilePayload.guild_badges || [],
                        profile_widgets: profilePayload.widgets || [],
                        guild_member: profilePayload.guild_member || null,
                        guild_member_profile: profilePayload.guild_member_profile || null,
                        guild_context_id: guildQuery ? guildContextId : null,
                        created_at: snowflakeToIsoDate(profilePayload.user.id)
                    };
                }
            }
        } catch (err) {
            rwError(`Profile lookup failed for ${userId}`, err);
        }

        if (!finalUser) {
            try {
                const directUserRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/users/${userId}`, token);
                if (directUserRes.ok) finalUser = await directUserRes.json();
            } catch (err) {}
        }
        const stores = getDiscordWebpackStores();
        if (!finalUser && stores.userStore && typeof stores.userStore.getUser === 'function') {
            const storeUser = stores.userStore.getUser(userId);
            if (storeUser) finalUser = JSON.parse(JSON.stringify(storeUser));
        }
        if (finalUser) {
            finalUser = enrichUserWithStores(finalUser, stores);
            finalUser = attachBadgeReport(finalUser);
        }
        return finalUser;
    }

    function snowflakeToIsoDate(snowflakeId) {
        try {
            if (!isValidSnowflakeId(snowflakeId)) return null;
            return new Date(Number((BigInt(snowflakeId) >> 22n) + 1420070400000n)).toISOString();
        } catch (err) {
            return null;
        }
    }

    async function appendUserCosmeticsToZip(userData, zipArchive, userFolderName, token) {
        const cosmeticsFolder = `${userFolderName}/cosmetics`;
        const savedCosmetics = [];
        const tryAppend = async (cosmeticLabel, appendAction) => {
            try {
                await appendAction();
                savedCosmetics.push(cosmeticLabel);
            } catch (cosmeticErr) {
                rwError(`User cosmetic download failed: ${cosmeticLabel}`, cosmeticErr);
            }
        };

        const decorationData = userData.avatar_decoration_data;
        if (decorationData && (decorationData.asset || decorationData.sku_id)) {
            const decorationEntry = buildInventoryAvatarDecorationEntry(decorationData, 'avatar_decoration');
            if (decorationEntry) await tryAppend('avatar_decoration', () => appendCollectibleEntryToZip(decorationEntry, zipArchive, `${cosmeticsFolder}/avatar_decoration`));
        }

        const nameplateData = userData.collectibles && userData.collectibles.nameplate;
        if (nameplateData) {
            const nameplateEntry = buildInventoryNameplateEntry(nameplateData, 'nameplate');
            if (nameplateEntry) await tryAppend('nameplate', () => appendCollectibleEntryToZip(nameplateEntry, zipArchive, `${cosmeticsFolder}/nameplate`));
        }

        const serverTagData = userData.primary_guild || userData.clan;
        if (serverTagData && isValidSnowflakeId(serverTagData.identity_guild_id) && /^[0-9a-f]{32}$/i.test(String(serverTagData.badge || ''))) {
            await tryAppend('server_tag_badge', async () => {
                const badgeBlob = await fetchFirstAvailableBlob([`https://cdn.discordapp.com/clan-badges/${serverTagData.identity_guild_id}/${serverTagData.badge}.png?size=64`]);
                const badgeBytes = new Uint8Array(await badgeBlob.arrayBuffer());
                zipArchive.addFile(`${cosmeticsFolder}/server_tag_badge.${detectMediaExtension(badgeBytes, 'png')}`, badgeBytes);
            });
        }

        const profileCollectibleRefs = Array.isArray(userData.profile_collectibles) ? userData.profile_collectibles.slice() : [];
        if (userData.profile_effect && userData.profile_effect.sku_id && !profileCollectibleRefs.some(collectibleRef => collectibleRef && collectibleRef.sku_id === userData.profile_effect.sku_id)) {
            profileCollectibleRefs.push({ sku_id: userData.profile_effect.sku_id, type: 1 });
        }
        for (const collectibleRef of profileCollectibleRefs) {
            if (!collectibleRef || (collectibleRef.type !== 1 && collectibleRef.type !== 3) || !isValidSnowflakeId(collectibleRef.sku_id)) continue;
            const cosmeticLabel = collectibleRef.type === 1 ? 'profile_effect' : 'profile_frame';
            await tryAppend(cosmeticLabel, async () => {
                const wasCached = collectibleProductCache.has(String(collectibleRef.sku_id));
                const collectibleProduct = await fetchCollectibleProduct(String(collectibleRef.sku_id), token);
                const normalizedEntry = normalizeInventoryPurchases([collectibleProduct])[0];
                if (!normalizedEntry) throw new Error('Collectible could not be normalized');
                await appendCollectibleEntryToZip(normalizedEntry.downloadEntry, zipArchive, `${cosmeticsFolder}/${cosmeticLabel}`);
                if (!wasCached) await sleepWithConfiguredDelay();
            });
        }

        const guildMemberData = userData.guild_member;
        const guildContextId = userData.guild_context_id;
        if (guildMemberData && isValidSnowflakeId(guildContextId)) {
            if (/^(?:a_)?[0-9a-f]{32}$/i.test(String(guildMemberData.avatar || ''))) {
                await tryAppend('server_avatar', async () => {
                    const serverAvatarExt = guildMemberData.avatar.startsWith('a_') ? 'gif' : 'png';
                    const serverAvatarBlob = await fetchFirstAvailableBlob([`https://cdn.discordapp.com/guilds/${guildContextId}/users/${userData.id}/avatars/${guildMemberData.avatar}.${serverAvatarExt}?size=1024`]);
                    zipArchive.addFile(`${cosmeticsFolder}/server_avatar.${serverAvatarExt}`, new Uint8Array(await serverAvatarBlob.arrayBuffer()));
                });
            }
            if (/^(?:a_)?[0-9a-f]{32}$/i.test(String(guildMemberData.banner || ''))) {
                await tryAppend('server_banner', async () => {
                    const serverBannerExt = guildMemberData.banner.startsWith('a_') ? 'gif' : 'png';
                    const serverBannerBlob = await fetchFirstAvailableBlob([`https://cdn.discordapp.com/guilds/${guildContextId}/users/${userData.id}/banners/${guildMemberData.banner}.${serverBannerExt}?size=1024`]);
                    zipArchive.addFile(`${cosmeticsFolder}/server_banner.${serverBannerExt}`, new Uint8Array(await serverBannerBlob.arrayBuffer()));
                });
            }
        }
        return savedCosmetics;
    }

    async function processAndDownloadUsers(rawUserList, token, zipBaseName, guildContextId = null) {
        try {
            const delayRange = readDownloadDelayRange();
            const zip = new LabsZip();
            for (let index = 0; index < rawUserList.length; index++) {
                const rawUser = rawUserList[index];
                const isAlreadyResolved = Array.isArray(rawUser.all_badges);
                const enrichedUser = isAlreadyResolved ? rawUser : (await resolveSingleUserData(rawUser.id, token, guildContextId) || rawUser);
                const folderName = `${getSafeFileName(enrichedUser.username || enrichedUser.id)}_${enrichedUser.id}`;

                if (enrichedUser.avatar) {
                    const avatarExt = enrichedUser.avatar.startsWith('a_') ? 'gif' : 'png';
                    try {
                        const avatarRes = await fetch(`https://cdn.discordapp.com/avatars/${enrichedUser.id}/${enrichedUser.avatar}.${avatarExt}?size=1024`);
                        if (avatarRes.ok) {
                            zip.addFile(`${folderName}/avatar.${avatarExt}`, new Uint8Array(await avatarRes.arrayBuffer()));
                        }
                    } catch (avErr) {}
                }
                if (enrichedUser.banner) {
                    const bannerExt = enrichedUser.banner.startsWith('a_') ? 'gif' : 'png';
                    try {
                        const bannerRes = await fetch(`https://cdn.discordapp.com/banners/${enrichedUser.id}/${enrichedUser.banner}.${bannerExt}?size=1024`);
                        if (bannerRes.ok) {
                            zip.addFile(`${folderName}/banner.${bannerExt}`, new Uint8Array(await bannerRes.arrayBuffer()));
                        }
                    } catch (bnErr) {}
                }

                const savedCosmetics = await appendUserCosmeticsToZip(enrichedUser, zip, folderName, token);
                const exportedUser = Object.assign({}, enrichedUser, { saved_cosmetics: savedCosmetics });
                zip.addFile(`${folderName}/data.json`, new TextEncoder().encode(JSON.stringify(exportedUser, null, 4)));

                const pct = Math.round(((index + 1) / rawUserList.length) * 100);
                updateProgressBar('rw-user', pct, `${pct}% (${index + 1}/${rawUserList.length})`);
                await sleep(randomJitter(delayRange.minDelayVal, delayRange.maxDelayVal));
            }

            usrDlBtn.innerText = "Packaging ZIP...";
            const zipBlob = zip.generate();
            await saveOutputFile(zipBlob, `${zipBaseName}_users.zip`);

            setTimeout(() => hideProgressBar('rw-user'), 2000);
            showNotification(`Saved ${formatItemCount(rawUserList.length, 'user', 'users')}!`, true);
        } catch (err) {
            rwError("User packaging failed", err);
            showNotification("User packaging failed.");
        } finally {
            usrDlBtn.disabled = false;
            usrDlBtn.innerText = "Extract User Data";
        }
    }

    usrDlBtn.addEventListener('click', async () => {
        const targetId = extractSnowflakeId(usrTargetId.value);
        if (!setInputValidationState(usrTargetId, Boolean(targetId))) {
            return showNotification("Please enter a valid Target ID");
        }
        const mode = usrModeSelect.value;
        const token = getDiscordToken();
        if (!token) return showNotification("Auth Token missing.");

        try {
            usrDlBtn.disabled = true;
            usrDlBtn.innerText = "Extracting...";
            const uniqueUsersMap = new Map();
            const stores = getDiscordWebpackStores();
            let userGuildContextId = null;

            if (mode === 'single') {
                const singleUser = await resolveSingleUserData(targetId, token);
                if (singleUser && singleUser.id) {
                    uniqueUsersMap.set(singleUser.id, singleUser);
                }
            } else if (mode === 'channel') {
                const resolvedChannelId = await resolveDmOrChannelId(targetId, token);
                try {
                    const chRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/channels/${resolvedChannelId}`, token);
                    if (chRes.ok) {
                        const chData = await chRes.json();
                        if (isValidSnowflakeId(chData.guild_id)) userGuildContextId = chData.guild_id;
                        if (Array.isArray(chData.recipients)) {
                            chData.recipients.forEach(recipient => uniqueUsersMap.set(recipient.id, recipient));
                        }
                    }
                } catch (err) {}
                let beforeId = null;
                for (let page = 0; page < 5; page++) {
                    try {
                        let msgUrl = `${apiBaseUrl}/channels/${resolvedChannelId}/messages?limit=100`;
                        if (beforeId) msgUrl += `&before=${beforeId}`;
                        const msgRes = await fetchApiWithRateLimitRetry(msgUrl, token);
                        if (!msgRes.ok) break;
                        const messages = await msgRes.json();
                        if (!Array.isArray(messages) || messages.length === 0) break;
                        messages.forEach(msg => {
                            if (msg.author && msg.author.id) uniqueUsersMap.set(msg.author.id, msg.author);
                            if (Array.isArray(msg.mentions)) {
                                msg.mentions.forEach(mention => {
                                    if (mention && mention.id) uniqueUsersMap.set(mention.id, mention);
                                });
                            }
                        });
                        beforeId = messages[messages.length - 1].id;
                        usrResolved.innerText = uniqueUsersMap.size;
                        if (messages.length < 100) break;
                        await sleepWithConfiguredDelay();
                    } catch (err) { break; }
                }
            } else if (mode === 'server') {
                const storedTargetChannel = stores.channelStore && typeof stores.channelStore.getChannel === 'function'
                    ? stores.channelStore.getChannel(targetId)
                    : null;
                const expectedGuildId = storedTargetChannel && storedTargetChannel.guild_id ? storedTargetChannel.guild_id : targetId;
                const scrolledMemberIds = new Set();
                await autoScrollMemberList(expectedGuildId, scrolledMemberIds);
                scrolledMemberIds.forEach(memberId => {
                    if (!uniqueUsersMap.has(memberId)) uniqueUsersMap.set(memberId, { id: memberId });
                });
                usrResolved.innerText = uniqueUsersMap.size;

                let guildId = targetId;
                if (stores.guildMemberStore && stores.userStore) {
                    try {
                        const cachedMembers = stores.guildMemberStore.getMembers(guildId);
                        if (Array.isArray(cachedMembers)) {
                            cachedMembers.forEach(member => {
                                const userObj = stores.userStore.getUser(member.userId);
                                if (userObj && userObj.id) {
                                    uniqueUsersMap.set(userObj.id, JSON.parse(JSON.stringify(userObj)));
                                }
                            });
                        }
                    } catch (storeErr) {}
                }

                try {
                    let channelsRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/guilds/${guildId}/channels`, token);
                    if (!channelsRes.ok) {
                        const chLookup = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/channels/${targetId}`, token);
                        if (chLookup.ok) {
                            const chInfo = await chLookup.json();
                            if (chInfo.guild_id) {
                                guildId = chInfo.guild_id;
                                channelsRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/guilds/${guildId}/channels`, token);
                            }
                        }
                    }

                    if (channelsRes.ok) {
                        userGuildContextId = guildId;
                        const channels = await channelsRes.json();
                        const readableChannels = Array.isArray(channels)
                            ? channels.filter(ch => ch.type === 0 || ch.type === 5).slice(0, 25)
                            : [];

                        for (const ch of readableChannels) {
                            try {
                                const mRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/channels/${ch.id}/messages?limit=100`, token);
                                if (mRes.ok) {
                                    const msgs = await mRes.json();
                                    if (Array.isArray(msgs)) {
                                        msgs.forEach(msg => {
                                            if (msg.author && msg.author.id) uniqueUsersMap.set(msg.author.id, msg.author);
                                            if (Array.isArray(msg.mentions)) {
                                                msg.mentions.forEach(mention => {
                                                    if (mention && mention.id) uniqueUsersMap.set(mention.id, mention);
                                                });
                                            }
                                        });
                                    }
                                    usrResolved.innerText = uniqueUsersMap.size;
                                }
                                await sleepWithConfiguredDelay();
                            } catch (chErr) {}
                        }
                    }
                } catch (err) {}
            }

            const usersList = Array.from(uniqueUsersMap.values());
            usrResolved.innerText = usersList.length;

            if (usersList.length === 0) {
                usrDlBtn.disabled = false;
                usrDlBtn.innerText = "Extract User Data";
                return showNotification("No users found for this Target ID.");
            }

            await processAndDownloadUsers(usersList, token, targetId, userGuildContextId);
        } catch (err) {
            usrDlBtn.disabled = false;
            usrDlBtn.innerText = "Extract User Data";
            showNotification("User extraction failed.");
        }
    });

    const msgModeSelect = document.getElementById('rw-message-mode');
    const msgDlBtn = document.getElementById('rw-message-dl-btn');
    const msgTargetId = document.getElementById('rw-message-target-id');
    const msgCount = document.getElementById('rw-message-count');

    msgModeSelect.addEventListener('change', (event) => {
        msgCount.innerText = '0';
        const modeVal = event.target.value;
        if (modeVal === 'entire') msgTargetId.placeholder = "Enter Target ID: (Server ID)";
        else if (modeVal === 'dm') msgTargetId.placeholder = "Enter Target ID: (DM Channel ID or User ID)";
        else msgTargetId.placeholder = "Enter Target ID: (Channel ID)";
    });

    msgTargetId.addEventListener('input', () => {
        const raw = msgTargetId.value.trim();
        setInputValidationState(msgTargetId, raw === '' || Boolean(extractSnowflakeId(raw)));
    });

    function formatMessageTranscriptLine(messageData) {
        const authorData = messageData.author || {};
        const authorLabel = authorData.global_name && authorData.username
            ? `${authorData.global_name} (@${authorData.username})`
            : (authorData.username || 'Unknown');
        const parsedTimestamp = messageData.timestamp ? new Date(messageData.timestamp) : null;
        const timestampLabel = parsedTimestamp && !isNaN(parsedTimestamp.getTime())
            ? parsedTimestamp.toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' UTC')
            : 'unknown time';
        const lineParts = [`[${timestampLabel}] ${authorLabel}:`];
        const referencedAuthor = messageData.referenced_message && messageData.referenced_message.author;
        if (referencedAuthor && referencedAuthor.username) lineParts.push(`(reply to @${referencedAuthor.username})`);
        if (messageData.content) lineParts.push(messageData.content);
        const attachmentNames = Array.isArray(messageData.attachments) ? messageData.attachments.map(attachment => attachment && attachment.filename).filter(Boolean) : [];
        if (attachmentNames.length > 0) lineParts.push(`[attachments: ${attachmentNames.join(', ')}]`);
        const embedCount = Array.isArray(messageData.embeds) ? messageData.embeds.length : 0;
        if (embedCount > 0) lineParts.push(`[embeds: ${embedCount}]`);
        const stickerNames = Array.isArray(messageData.sticker_items) ? messageData.sticker_items.map(sticker => sticker && sticker.name).filter(Boolean) : [];
        if (stickerNames.length > 0) lineParts.push(`[stickers: ${stickerNames.join(', ')}]`);
        if (messageData.edited_timestamp) lineParts.push('(edited)');
        return lineParts.join(' ');
    }

    async function fetchAllMessagesFromChannel(channelId, token, globalMsgCountRef) {
        const allMessages = [];
        let beforeId = null;

        while (true) {
            try {
                let requestUrl = `${apiBaseUrl}/channels/${channelId}/messages?limit=100`;
                if (beforeId) requestUrl += `&before=${beforeId}`;

                const response = await fetchApiWithRateLimitRetry(requestUrl, token);

                if (response.status === 429) {
                    const retryHeader = response.headers.get('Retry-After');
                    const waitMs = retryHeader ? (parseFloat(retryHeader) * 1000) : 2500;
                    await sleep(waitMs + 500);
                    continue;
                }

                if (!response.ok) {
                    break;
                }

                const batch = await response.json();
                if (!Array.isArray(batch) || batch.length === 0) break;

                allMessages.push(...batch);
                beforeId = batch[batch.length - 1].id;

                const currentTotal = globalMsgCountRef.count + allMessages.length;
                updateProgressBar('rw-message', 100, `Messages Loaded: ${currentTotal}`);
                msgCount.innerText = currentTotal;

                if (batch.length < 100) break;
                await sleepWithConfiguredDelay();
            } catch (err) {
                break;
            }
        }

        const uniqueMsgs = [];
        const seenIds = new Set();
        for (const msg of allMessages) {
            if (msg && msg.id && !seenIds.has(msg.id)) {
                seenIds.add(msg.id);
                uniqueMsgs.push(msg);
            }
        }

        uniqueMsgs.sort((msgA, msgB) => (BigInt(msgB.id) > BigInt(msgA.id) ? 1 : -1));
        globalMsgCountRef.count += uniqueMsgs.length;
        return uniqueMsgs;
    }

    async function downloadMessageAttachments(msgList, zipInstance, basePath) {
        for (const msg of msgList) {
            if (Array.isArray(msg.attachments) && msg.attachments.length > 0) {
                for (let i = 0; i < msg.attachments.length; i++) {
                    const att = msg.attachments[i];
                    try {
                        const attBlob = await fetchWithBackoff(att.url);
                        const cleanAttName = getSafeFileName(att.filename || `attachment_${att.id}`);
                        const uint8Data = new Uint8Array(await attBlob.arrayBuffer());
                        zipInstance.addFile(`${basePath}/attachments/${msg.id}_${cleanAttName}`, uint8Data);
                    } catch (err) {}
                }
            }
        }
    }

    msgDlBtn.addEventListener('click', async () => {
        const rawTargetId = extractSnowflakeId(msgTargetId.value);
        if (!setInputValidationState(msgTargetId, Boolean(rawTargetId))) {
            return showNotification("Please enter a valid Target ID");
        }
        const mode = msgModeSelect.value;
        const token = getDiscordToken();
        if (!token) return showNotification("Auth Token missing.");

        try {
            msgDlBtn.disabled = true;
            msgDlBtn.innerText = "Scraping Messages...";
            msgCount.innerText = '0';

            const zip = new LabsZip();
            const globalMsgCountRef = { count: 0 };

            if (mode === 'entire') {
                let guildId = rawTargetId;
                let channelsRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/guilds/${guildId}/channels`, token);

                if (!channelsRes.ok) {
                    const chInfoRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/channels/${rawTargetId}`, token);
                    if (chInfoRes.ok) {
                        const chInfo = await chInfoRes.json();
                        if (chInfo.guild_id) {
                            guildId = chInfo.guild_id;
                            channelsRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/guilds/${guildId}/channels`, token);
                        }
                    }
                }

                if (!channelsRes.ok) {
                    throw new Error("Unable to resolve Server Channels");
                }

                const channels = await channelsRes.json();
                const textChannels = Array.isArray(channels)
                    ? channels.filter(ch => ch.type === 0 || ch.type === 5)
                    : [];

                for (let index = 0; index < textChannels.length; index++) {
                    const channelObj = textChannels[index];
                    const cleanChannelName = getSafeFileName(channelObj.name || channelObj.id);
                    const msgs = await fetchAllMessagesFromChannel(channelObj.id, token, globalMsgCountRef);
                    if (msgs.length > 0) {
                        const folderPath = `${cleanChannelName}_${channelObj.id}`;
                        zip.addFile(`${folderPath}/messages.json`, new TextEncoder().encode(JSON.stringify(msgs, null, 4)));
                        const formattedTxt = msgs.slice().reverse().map(formatMessageTranscriptLine).join('\n');
                        zip.addFile(`${folderPath}/messages.txt`, new TextEncoder().encode(formattedTxt));
                        await downloadMessageAttachments(msgs, zip, folderPath);
                    }
                }
            } else {
                let resolvedChannelId = rawTargetId;
                if (mode === 'dm' || mode === 'group') {
                    resolvedChannelId = await resolveDmOrChannelId(rawTargetId, token);
                } else {
                    const testChannelRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/channels/${rawTargetId}`, token);
                    if (!testChannelRes.ok) {
                        const fallbackGuildRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/guilds/${rawTargetId}/channels`, token);
                        if (fallbackGuildRes.ok) {
                            const guildChannels = await fallbackGuildRes.json();
                            const firstTextChannel = Array.isArray(guildChannels) ? guildChannels.find(c => c.type === 0) : null;
                            if (firstTextChannel) resolvedChannelId = firstTextChannel.id;
                        } else {
                            resolvedChannelId = await resolveDmOrChannelId(rawTargetId, token);
                        }
                    }
                }

                const msgs = await fetchAllMessagesFromChannel(resolvedChannelId, token, globalMsgCountRef);
                if (msgs.length > 0) {
                    const folderPath = `channel_${resolvedChannelId}`;
                    zip.addFile(`${folderPath}/messages.json`, new TextEncoder().encode(JSON.stringify(msgs, null, 4)));
                    const formattedTxt = msgs.slice().reverse().map(formatMessageTranscriptLine).join('\n');
                    zip.addFile(`${folderPath}/messages.txt`, new TextEncoder().encode(formattedTxt));
                    await downloadMessageAttachments(msgs, zip, folderPath);
                }
            }

            if (globalMsgCountRef.count === 0) {
                hideProgressBar('rw-message');
                return showNotification("No accessible messages found for this ID.");
            }

            msgDlBtn.innerText = "Packaging ZIP...";
            const contentBlob = zip.generate();
            await saveOutputFile(contentBlob, `${rawTargetId}_messages.zip`);

            setTimeout(() => hideProgressBar('rw-message'), 2000);
            showNotification(`Saved ${globalMsgCountRef.count} Messages!`, true);
        } catch (err) {
            showNotification("Message Scrape Failed: Check ID or Permissions.");
        } finally {
            msgDlBtn.disabled = false;
            msgDlBtn.innerText = "Scrape Messages";
        }
    });

    const srvGuildId = document.getElementById('rw-server-guild-id');
    const srvDlBtn = document.getElementById('rw-server-dl-btn');

    let serverLookupTimer = null;
    let serverLookupGuildId = null;
    let serverLookupSequence = 0;

    srvGuildId.addEventListener('input', (event) => {
        const rawVal = event.target.value.trim();
        const guildId = extractSnowflakeId(rawVal);
        setInputValidationState(srvGuildId, rawVal === '' || Boolean(guildId));
        clearTimeout(serverLookupTimer);

        if (!guildId) {
            serverLookupGuildId = null;
            serverLookupSequence++;
            srvDlBtn.style.display = 'none';
            hideServerPreview();
            return;
        }
        if (guildId === serverLookupGuildId) return;
        serverLookupTimer = setTimeout(() => {
            serverLookupGuildId = guildId;
            loadServerOverview(guildId);
        }, 700);
    });

    const guildVerificationLabels = ['None', 'Low', 'Medium', 'High', 'Highest'];
    const guildNsfwLabels = ['Default', 'Explicit', 'Safe', 'Age Restricted'];

    function buildGuildImageUrl(imageFolder, guildId, imageHash, imageSize) {
        if (!isValidSnowflakeId(guildId) || !/^(?:a_)?[0-9a-f]{32}$/i.test(String(imageHash || ''))) return null;
        const imageExtension = imageHash.startsWith('a_') ? 'gif' : 'png';
        return `https://cdn.discordapp.com/${imageFolder}/${guildId}/${imageHash}.${imageExtension}?size=${imageSize}`;
    }

    function setPreviewImage(imageNode, containerNode, imageUrl) {
        if (!imageUrl) {
            containerNode.classList.add('rw-hidden');
            imageNode.removeAttribute('src');
            return false;
        }
        imageNode.onerror = () => containerNode.classList.add('rw-hidden');
        imageNode.src = imageUrl;
        containerNode.classList.remove('rw-hidden');
        return true;
    }

    function hideServerPreview() {
        document.getElementById('rw-srv-preview').classList.add('rw-hidden');
    }

    function renderServerPreview(guildData) {
        const bannerImage = document.getElementById('rw-srv-banner-img');
        const iconImage = document.getElementById('rw-srv-icon-img');
        setPreviewImage(bannerImage, document.getElementById('rw-srv-banner-wrap'), buildGuildImageUrl('banners', guildData.id, guildData.banner, 1024));
        setPreviewImage(iconImage, iconImage, buildGuildImageUrl('icons', guildData.id, guildData.icon, 256));
        document.getElementById('rw-srv-preview-name').textContent = guildData.name || 'Unknown Server';
        const memberCount = guildData.approximate_member_count || 0;
        const onlineCount = guildData.approximate_presence_count || 0;
        document.getElementById('rw-srv-preview-sub').textContent = `${memberCount.toLocaleString('en-US')} members • ${onlineCount.toLocaleString('en-US')} online`;
        const descriptionNode = document.getElementById('rw-srv-description');
        descriptionNode.textContent = guildData.description || '';
        descriptionNode.classList.toggle('rw-hidden', !guildData.description);
        const hasSplash = setPreviewImage(document.getElementById('rw-srv-splash-img'), document.getElementById('rw-srv-splash-fig'), buildGuildImageUrl('splashes', guildData.id, guildData.splash, 512));
        const hasDiscoverySplash = setPreviewImage(document.getElementById('rw-srv-discovery-img'), document.getElementById('rw-srv-discovery-fig'), buildGuildImageUrl('discovery-splashes', guildData.id, guildData.discovery_splash, 512));
        document.getElementById('rw-srv-splash-row').classList.toggle('rw-hidden', !hasSplash && !hasDiscoverySplash);
        document.getElementById('rw-srv-preview').classList.remove('rw-hidden');
    }

    function fillServerExtraInfo(guildData) {
        const guildEmojis = Array.isArray(guildData.emojis) ? guildData.emojis : [];
        const guildStickers = Array.isArray(guildData.stickers) ? guildData.stickers : [];
        const guildFeatures = Array.isArray(guildData.features) ? guildData.features : [];
        const createdAt = snowflakeToIsoDate(guildData.id);
        document.getElementById('rw-srv-online').innerText = (guildData.approximate_presence_count || 0).toLocaleString('en-US');
        document.getElementById('rw-srv-created').innerText = createdAt ? createdAt.slice(0, 10) : 'Unknown';
        document.getElementById('rw-srv-boosts').innerText = `${guildData.premium_tier || 0} / ${guildData.premium_subscription_count || 0}`;
        document.getElementById('rw-srv-vanity').innerText = guildData.vanity_url_code ? `discord.gg/${guildData.vanity_url_code}` : 'None';
        document.getElementById('rw-srv-safety').innerText = `${guildVerificationLabels[guildData.verification_level] || 'Unknown'} / ${guildNsfwLabels[guildData.nsfw_level] || 'Unknown'}`;
        const animatedEmojiCount = guildEmojis.filter(guildEmoji => guildEmoji && guildEmoji.animated).length;
        document.getElementById('rw-srv-emoji-sticker').innerText = `${guildEmojis.length} (${animatedEmojiCount} animated) / ${guildStickers.length}`;
        const featuresNode = document.getElementById('rw-srv-features');
        featuresNode.innerText = String(guildFeatures.length);
        if (guildFeatures.length > 0) featuresNode.setAttribute('data-tooltip', guildFeatures.slice().sort().join(', '));
        else featuresNode.removeAttribute('data-tooltip');
    }

    function buildStickerDownloadInfo(stickerData) {
        if (!stickerData || !isValidSnowflakeId(stickerData.id)) return null;
        if (stickerData.format_type === 3) return { url: `https://discord.com/stickers/${stickerData.id}.json`, extension: 'json' };
        if (stickerData.format_type === 4) return { url: `https://media.discordapp.net/stickers/${stickerData.id}.gif`, extension: 'gif' };
        return { url: `https://cdn.discordapp.com/stickers/${stickerData.id}.png`, extension: 'png' };
    }

    async function appendStickersToZip(stickerList, zipArchive, folderPath) {
        let savedStickerCount = 0;
        for (const stickerData of stickerList) {
            const stickerInfo = buildStickerDownloadInfo(stickerData);
            if (!stickerInfo) continue;
            try {
                const stickerBlob = await fetchWithBackoff(stickerInfo.url, 3);
                const stickerBytes = new Uint8Array(await stickerBlob.arrayBuffer());
                const stickerExtension = stickerInfo.extension === 'json' ? 'json' : detectMediaExtension(stickerBytes, stickerInfo.extension);
                zipArchive.addFile(`${folderPath}/${getSafeFileName(stickerData.name || 'sticker')}_${stickerData.id}.${stickerExtension}`, stickerBytes);
                savedStickerCount++;
            } catch (stickerErr) {
                rwError(`Sticker download failed: ${stickerData.id}`, stickerErr);
            }
            await sleep(randomJitter(150, 350));
        }
        return savedStickerCount;
    }

    function summarizeGuildRoles(guildRoles, guildId) {
        if (!Array.isArray(guildRoles) || guildRoles.length === 0) return { label: 'None', fullList: '' };
        const namedRoles = guildRoles
            .filter(guildRole => guildRole && guildRole.id !== guildId)
            .sort((leftRole, rightRole) => (rightRole.position || 0) - (leftRole.position || 0))
            .map(guildRole => String(guildRole.name || guildRole.id));
        if (namedRoles.length === 0) return { label: '@everyone only', fullList: '' };
        const visibleRoles = namedRoles.slice(0, 3).join(', ');
        return { label: namedRoles.length > 3 ? `${visibleRoles} +${namedRoles.length - 3}` : visibleRoles, fullList: namedRoles.join('\n') };
    }

    async function loadServerOverview(guildId) {
        const lookupSequence = ++serverLookupSequence;
        {
            document.getElementById('rw-srv-name').innerText = "Fetching from API...";
            const token = getDiscordToken();
            if (!token) {
                document.getElementById('rw-srv-name').innerText = "Auth Token Error";
                return showNotification("Missing Authorization Token.");
            }
            try {
                const res = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/guilds/${guildId}?with_counts=true`, token);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const guildData = await res.json();

                const cRes = await fetchApiWithRateLimitRetry(`${apiBaseUrl}/guilds/${guildId}/channels`, token);
                let channelsData = [];
                if (cRes.ok) channelsData = await cRes.json();

                let ownerName = "Unknown";
                let ownerDisp = "Unknown";

                if (guildData.owner_id) {
                    const ownerObj = await resolveSingleUserData(guildData.owner_id, token);
                    if (ownerObj) {
                        ownerName = ownerObj.username || "Unknown";
                        ownerDisp = ownerObj.global_name || ownerObj.username || "Unknown";
                    }
                }

                const detectedBotIds = new Set();
                if (Array.isArray(guildData.roles)) {
                    guildData.roles.forEach(guildRole => {
                        if (guildRole && guildRole.tags && guildRole.tags.bot_id) detectedBotIds.add(guildRole.tags.bot_id);
                    });
                }
                const stores = getDiscordWebpackStores();
                if (stores.guildMemberStore && stores.userStore) {
                    try {
                        const members = stores.guildMemberStore.getMembers(guildId);
                        if (Array.isArray(members)) {
                            members.forEach(member => {
                                const memberUser = stores.userStore.getUser(member.userId);
                                if (memberUser && isBotUser(memberUser)) detectedBotIds.add(memberUser.id);
                            });
                        }
                    } catch (err) {
                        rwError("Bot detection via member store failed", err);
                    }
                }
                const openGuildMatch = window.location.pathname.match(/^\/channels\/(\d{15,22})/);
                if (openGuildMatch && openGuildMatch[1] === guildId) {
                    document.querySelectorAll('[data-list-item-id*="members"]').forEach(memberItem => {
                        if (!memberItem.querySelector('[class*="botTag"], [class*="BotTag"]')) return;
                        const botIdMatch = (memberItem.getAttribute('data-list-item-id') || '').match(/(\d{15,22})/);
                        if (botIdMatch) detectedBotIds.add(botIdMatch[1]);
                    });
                }
                const botCount = detectedBotIds.size;
                if (lookupSequence !== serverLookupSequence) return;
                renderServerPreview(guildData);
                fillServerExtraInfo(guildData);

                document.getElementById('rw-srv-owner-name').innerText = ownerName;
                document.getElementById('rw-srv-owner-disp').innerText = ownerDisp;
                document.getElementById('rw-srv-owner-id').innerText = guildData.owner_id || "Unknown";
                document.getElementById('rw-srv-community').innerText = Array.isArray(guildData.features) && guildData.features.includes("COMMUNITY") ? "Enabled" : "Disabled";
                document.getElementById('rw-srv-pic').innerText = guildData.icon ? "Found" : "Not Found";
                document.getElementById('rw-srv-banner').innerText = guildData.banner ? "Found" : "Not Found";
                document.getElementById('rw-srv-name').innerText = guildData.name || "Unknown";
                document.getElementById('rw-srv-users').innerText = guildData.approximate_member_count || "0";
                document.getElementById('rw-srv-bots').innerText = botCount.toString();
                document.getElementById('rw-srv-roles-cnt').innerText = Array.isArray(guildData.roles) ? guildData.roles.length : "0";
                const roleSummary = summarizeGuildRoles(guildData.roles, guildData.id);
                const rolesListNode = document.getElementById('rw-srv-roles-list');
                rolesListNode.innerText = roleSummary.label;
                if (roleSummary.fullList) rolesListNode.setAttribute('data-tooltip', roleSummary.fullList.split('\n').slice(0, 25).join(', '));
                else rolesListNode.removeAttribute('data-tooltip');

                let catCount = 0;
                let txtCount = 0;
                let vocCount = 0;
                let admCount = 0;

                if (Array.isArray(channelsData)) {
                    channelsData.forEach(ch => {
                        if (ch.type === 4) catCount++;
                        else if (ch.type === 0 || ch.type === 5) txtCount++;
                        else if (ch.type === 2 || ch.type === 13) vocCount++;
                        if (Array.isArray(ch.permission_overwrites)) {
                            const everyoneOw = ch.permission_overwrites.find(ow => ow.id === guildData.id);
                            if (everyoneOw && (BigInt(everyoneOw.deny) & 1024n) === 1024n) {
                                admCount++;
                            }
                        }
                    });
                }

                document.getElementById('rw-srv-cat').innerText = catCount;
                document.getElementById('rw-srv-text').innerText = txtCount;
                document.getElementById('rw-srv-voice').innerText = vocCount;
                document.getElementById('rw-srv-admin').innerText = admCount.toString();

                srvDlBtn.style.display = 'block';
                srvDlBtn.dataset.guildData = JSON.stringify({ guild: guildData, channels: channelsData });
            } catch (err) {
                if (lookupSequence !== serverLookupSequence) return;
                rwError("Server overview lookup failed", err);
                serverLookupGuildId = null;
                document.getElementById('rw-srv-name').innerText = "API Error / Unauthorized";
                srvDlBtn.style.display = 'none';
                hideServerPreview();
            }
        }
    }

    srvDlBtn.addEventListener('click', async () => {
        const raw = srvDlBtn.dataset.guildData;
        if (!raw) return;
        const parsedData = JSON.parse(raw);
        const guild = parsedData.guild;

        try {
            srvDlBtn.disabled = true;
            srvDlBtn.innerText = "Generating Archive...";

            const zip = new LabsZip();

            if (guild.icon) {
                try {
                    const iconExt = guild.icon.startsWith('a_') ? 'gif' : 'png';
                    const iconBlob = await fetchWithBackoff(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${iconExt}?size=1024`);
                    zip.addFile(`Guild Assets/icon_${guild.id}.${iconExt}`, new Uint8Array(await iconBlob.arrayBuffer()));
                } catch (err) {}
            }
            if (guild.banner) {
                try {
                    const bannerExt = guild.banner.startsWith('a_') ? 'gif' : 'png';
                    const bannerBlob = await fetchWithBackoff(`https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.${bannerExt}?size=1024`);
                    zip.addFile(`Guild Assets/banner_${guild.id}.${bannerExt}`, new Uint8Array(await bannerBlob.arrayBuffer()));
                } catch (err) {}
            }
            if (guild.splash) {
                try {
                    const splashBlob = await fetchWithBackoff(`https://cdn.discordapp.com/splashes/${guild.id}/${guild.splash}.png?size=1024`);
                    zip.addFile(`Guild Assets/splash_${guild.id}.png`, new Uint8Array(await splashBlob.arrayBuffer()));
                } catch (err) {}
            }
            if (guild.discovery_splash) {
                try {
                    const discoverySplashBlob = await fetchWithBackoff(`https://cdn.discordapp.com/discovery-splashes/${guild.id}/${guild.discovery_splash}.png?size=1024`);
                    zip.addFile(`Guild Assets/discovery_splash_${guild.id}.png`, new Uint8Array(await discoverySplashBlob.arrayBuffer()));
                } catch (err) {
                    rwError("Discovery splash download failed", err);
                }
            }

            if (Array.isArray(guild.stickers) && guild.stickers.length > 0) {
                srvDlBtn.innerText = "Downloading Stickers...";
                await appendStickersToZip(guild.stickers, zip, 'Guild Assets/Stickers');
            }

            const statsJson = JSON.stringify(parsedData, null, 4);
            zip.addFile(`Guild Assets/server_info_${guild.id}.json`, new TextEncoder().encode(statsJson));

            if (Array.isArray(guild.roles)) {
                const rolesTxt = guild.roles.map(role => `${role.name} (${role.id})`).join('\n');
                zip.addFile(`Guild Assets/roles_${guild.id}.txt`, new TextEncoder().encode(rolesTxt));
            }

            const contentBlob = zip.generate();
            await saveOutputFile(contentBlob, `${guild.id}_guild_assets.zip`);

            showNotification("Server Assets Saved successfully!", true);
        } catch (err) {
            showNotification("Zipping/Saving failed.");
        } finally {
            srvDlBtn.disabled = false;
            srvDlBtn.innerText = "Download Server Assets";
        }
    });

    scrapeCurrentView();
})();
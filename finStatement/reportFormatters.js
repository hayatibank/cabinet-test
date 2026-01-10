/* /webapp/finStatement/reportFormatters.js v1.4.0 */
// CHANGELOG v1.4.0:
// - FIXED: All analysis display updated to match new formulas
// - Updated all 8 metrics with correct values

export function formatCurrency(amount, currency = '₽') {
  const formatted = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount || 0);
  
  return `${formatted} ${currency}`;
}

export function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatMonths(value) {
  const months = Math.floor(value);
  return `${months} мес.`;
}

export function formatIncomeSection(incomeData) {
  const t = window.i18n.t.bind(window.i18n);
  
  const groups = [
    { key: 'A', label: t('income.A') || 'Найм', items: [] },
    { key: 'C', label: t('income.C') || 'Активы', items: [] },
    { key: 'E', label: t('income.E') || 'Портфолио', items: [] }
  ];
  
  let grandTotal = 0;
  
  incomeData.forEach(item => {
    const groupKey = item.code.charAt(0);
    const group = groups.find(g => g.key === groupKey);
    if (group) {
      group.items.push(item);
      grandTotal += Number(item.amount) || 0;
    }
  });
  
  let html = `
    <div class="report-section income-section">
      <h3>${t('report.income')}</h3>
      <div class="report-table">
  `;
  
  const letterMapping = {
    'A': { header: 'A', total: 'B' },
    'C': { header: 'C', total: 'D' },
    'E': { header: 'E', total: 'F' }
  };
  
  groups.forEach(group => {
    const letters = letterMapping[group.key];
    const groupTotal = group.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    
    html += `
      <div class="report-row group-header-row">
        <div class="report-cell">${letters.header}. ${group.label}</div>
        <div class="report-cell amount-cell"></div>
      </div>
    `;
    
    group.items.forEach(item => {
      html += `
        <div class="report-row subcategory-row editable-row" 
             onclick="window.reportManager.showEditModal('income', '${item.code}')"
             title="${t('common.clickToEdit')}">
          <div class="report-cell subcategory-cell">${item.label}</div>
          <div class="report-cell amount-cell">${formatCurrency(item.amount || 0)}</div>
        </div>
      `;
    });
    
    html += `
      <div class="report-row group-total-row">
        <div class="report-cell">${letters.total}. ${group.label} ${t('report.total')}</div>
        <div class="report-cell amount-cell group-total-amount">${formatCurrency(groupTotal)}</div>
      </div>
    `;
  });
  
  html += `
    <div class="report-row grand-total-row income-total">
      <div class="report-cell">${t('report.total.income')}</div>
      <div class="report-cell amount-cell grand-total-amount">${formatCurrency(grandTotal)}</div>
    </div>
  `;
  
  html += `
      </div>
    </div>
  `;
  
  return html;
}

export function formatExpensesSection(expensesData, totalIncome = 0) {
  const t = window.i18n.t.bind(window.i18n);
  
  const groups = {
    '0': { label: t('expenses.0') || 'Предварительные', items: [], letter: 'H' },
    '1': { label: t('expenses.1') || 'Основные', items: [], letter: 'J' }
  };
  
  let grandTotal = 0;
  
  expensesData.forEach(item => {
    const groupKey = item.code.charAt(0);
    if (groups[groupKey]) {
      groups[groupKey].items.push(item);
      grandTotal += Number(item.amount) || 0;
    }
  });
  
  const cashFlow = totalIncome - grandTotal;
  const isPositive = cashFlow >= 0;
  
  let html = `
    <div class="report-section expenses-section">
      <h3>${t('report.expenses')}</h3>
      <div class="report-table">
  `;
  
  Object.entries(groups).forEach(([key, group]) => {
    const groupTotal = group.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    
    html += `
      <div class="report-row group-header-row">
        <div class="report-cell">${group.letter}. ${group.label}</div>
        <div class="report-cell amount-cell"></div>
      </div>
    `;
    
    group.items.forEach(item => {
      html += `
        <div class="report-row subcategory-row editable-row"
             onclick="window.reportManager.showEditModal('expenses', '${item.code}')"
             title="${t('common.clickToEdit')}">
          <div class="report-cell subcategory-cell">${item.label}</div>
          <div class="report-cell amount-cell">${formatCurrency(item.amount || 0)}</div>
        </div>
      `;
    });
    
    const nextLetter = String.fromCharCode(group.letter.charCodeAt(0) + 1);
    html += `
      <div class="report-row group-total-row">
        <div class="report-cell">${nextLetter}. ${group.label} ${t('report.total')}</div>
        <div class="report-cell amount-cell group-total-amount">${formatCurrency(groupTotal)}</div>
      </div>
    `;
  });
  
  html += `
    <div class="report-row grand-total-row expenses-total">
      <div class="report-cell">${t('report.total.expenses')}</div>
      <div class="report-cell amount-cell grand-total-amount">${formatCurrency(grandTotal)}</div>
    </div>
  `;
  
  html += `
    <div class="report-row grand-total-row cash-flow-row ${isPositive ? 'positive-flow' : 'negative-flow'}">
      <div class="report-cell">${t('report.cashFlow')}</div>
      <div class="report-cell amount-cell grand-total-amount">${formatCurrency(cashFlow)}</div>
    </div>
  `;
  
  html += `
      </div>
    </div>
  `;
  
  return html;
}

export function formatAssetsSection(assetsData) {
  const t = window.i18n.t.bind(window.i18n);
  
  const groups = {
    'N': { label: t('assets.N') || 'Активы', items: [] },
    'P': { label: t('assets.P') || 'Роскошь', items: [] }
  };
  
  let activesTotal = 0;
  let luxuryTotal = 0;
  
  assetsData.forEach(item => {
    const groupKey = item.code.charAt(0);
    if (groups[groupKey]) {
      groups[groupKey].items.push(item);
      if (groupKey === 'N') {
        activesTotal += Number(item.amount) || 0;
      } else if (groupKey === 'P') {
        luxuryTotal += Number(item.amount) || 0;
      }
    }
  });
  
  const assetsByBanker = activesTotal + luxuryTotal;
  const assetsFactual = activesTotal;
  
  let html = `
    <div class="report-section assets-section">
      <h3>${t('report.assets')}</h3>
      <div class="report-table">
  `;
  
  html += `
    <div class="report-row group-header-row">
      <div class="report-cell">N. ${groups['N'].label}</div>
      <div class="report-cell amount-cell"></div>
    </div>
  `;
  
  groups['N'].items.forEach(item => {
    html += `
      <div class="report-row subcategory-row editable-row"
           onclick="window.reportManager.showEditModal('assets', '${item.code}')"
           title="${t('common.clickToEdit')}">
        <div class="report-cell subcategory-cell">${item.label}</div>
        <div class="report-cell amount-cell">${formatCurrency(item.amount || 0)}</div>
      </div>
    `;
  });
  
  html += `
    <div class="report-row group-total-row">
      <div class="report-cell">O. ${groups['N'].label} ${t('report.subtotal')}</div>
      <div class="report-cell amount-cell group-total-amount">${formatCurrency(activesTotal)}</div>
    </div>
  `;
  
  html += `
    <div class="report-row group-header-row">
      <div class="report-cell">P. ${groups['P'].label}</div>
      <div class="report-cell amount-cell"></div>
    </div>
  `;
  
  groups['P'].items.forEach(item => {
    html += `
      <div class="report-row subcategory-row editable-row"
           onclick="window.reportManager.showEditModal('assets', '${item.code}')"
           title="${t('common.clickToEdit')}">
        <div class="report-cell subcategory-cell">${item.label}</div>
        <div class="report-cell amount-cell">${formatCurrency(item.amount || 0)}</div>
      </div>
    `;
  });
  
  html += `
    <div class="report-row group-total-row">
      <div class="report-cell">Q. ${groups['P'].label} ${t('report.total')}</div>
      <div class="report-cell amount-cell group-total-amount">${formatCurrency(luxuryTotal)}</div>
    </div>
  `;
  
  html += `
    <div class="report-row grand-total-row assets-total">
      <div class="report-cell">${t('report.total.assets.banker')}</div>
      <div class="report-cell amount-cell grand-total-amount">${formatCurrency(assetsByBanker)}</div>
    </div>
  `;
  
  html += `
    <div class="report-row grand-total-row assets-factual">
      <div class="report-cell">${t('report.total.assets.factual')}</div>
      <div class="report-cell amount-cell grand-total-amount">${formatCurrency(assetsFactual)}</div>
    </div>
  `;
  
  html += `
      </div>
    </div>
  `;
  
  return html;
}

export function formatLiabilitiesSection(liabilitiesData, assetsByBanker = 0, assetsFactual = 0) {
  const t = window.i18n.t.bind(window.i18n);
  
  let total = 0;
  
  liabilitiesData.forEach(item => {
    total += Number(item.amount) || 0;
  });
  
  const netWorthByBanker = assetsByBanker - total;
  const netWorthFactual = assetsFactual - total;
  
  let html = `
    <div class="report-section liabilities-section">
      <h3>${t('report.liabilities')}</h3>
      <div class="report-table">
        <div class="report-row group-header-row">
          <div class="report-cell">T. ${t('liabilities.T') || 'Пассивы'}</div>
          <div class="report-cell amount-cell"></div>
        </div>
  `;
  
  liabilitiesData.forEach(item => {
    html += `
      <div class="report-row subcategory-row editable-row"
           onclick="window.reportManager.showEditModal('liabilities', '${item.code}')"
           title="${t('common.clickToEdit')}">
        <div class="report-cell subcategory-cell">${item.label}</div>
        <div class="report-cell amount-cell">${formatCurrency(item.amount || 0)}</div>
      </div>
    `;
  });
  
  html += `
    <div class="report-row grand-total-row liabilities-total">
      <div class="report-cell">${t('report.total.liabilities')}</div>
      <div class="report-cell amount-cell grand-total-amount">${formatCurrency(total)}</div>
    </div>
  `;
  
  const vPositive = netWorthByBanker >= 0;
  html += `
    <div class="report-row grand-total-row net-worth-row ${vPositive ? 'positive-net-worth' : 'negative-net-worth'}">
      <div class="report-cell">${t('report.netWorth.banker')}</div>
      <div class="report-cell amount-cell grand-total-amount">${formatCurrency(netWorthByBanker)}</div>
    </div>
  `;
  
  const wPositive = netWorthFactual >= 0;
  html += `
    <div class="report-row grand-total-row net-worth-row ${wPositive ? 'positive-net-worth' : 'negative-net-worth'}">
      <div class="report-cell">${t('report.netWorth.factual')}</div>
      <div class="report-cell amount-cell grand-total-amount">${formatCurrency(netWorthFactual)}</div>
    </div>
  `;
  
  html += `
      </div>
    </div>
  `;
  
  return html;
}

export function formatAnalysisSection(analysis) {
  const t = window.i18n.t.bind(window.i18n);
  
  return `
    <div class="report-section analysis-section">
      <h3>${t('report.analysis')}</h3>
      <div class="report-table analysis-table">
        <div class="report-row header-row">
          <div class="report-cell metric-cell">📊 ${t('analysis.metric')}</div>
          <div class="report-cell formula-cell">💡 ${t('analysis.formula')}</div>
          <div class="report-cell value-cell">🔢 ${t('analysis.value')}</div>
        </div>
        
        <div class="report-row">
          <div class="report-cell">${t('analysis.saving')}</div>
          <div class="report-cell formula">${t('analysis.formula.saving')}<br><span class="formula-note">${t('analysis.note.shouldGrow')}</span></div>
          <div class="report-cell value-cell ${analysis.cashFlowGrowth ? 'positive' : 'negative'}">
            ${formatPercent(analysis.savingRate)}
            ${analysis.cashFlowGrowth ? '↑' : '↓'}
          </div>
        </div>
        
        <div class="report-row">
          <div class="report-cell">${t('analysis.moneyWorking')}</div>
          <div class="report-cell formula">${t('analysis.formula.moneyWorking')}<br><span class="formula-note">${t('analysis.note.shouldGrow')}</span></div>
          <div class="report-cell value-cell ${analysis.moneyWorkingGrowth ? 'positive' : 'negative'}">
            ${formatPercent(analysis.moneyWorking)}
            ${analysis.moneyWorkingGrowth ? '↑' : '↓'}
          </div>
        </div>
        
        <div class="report-row">
          <div class="report-cell">${t('analysis.taxes')}</div>
          <div class="report-cell formula">${t('analysis.formula.taxes')}</div>
          <div class="report-cell value-cell">
            ${formatPercent(analysis.taxRate)}
          </div>
        </div>
        
        <div class="report-row">
          <div class="report-cell">${t('analysis.housing')}</div>
          <div class="report-cell formula">${t('analysis.formula.housing')}<br><span class="formula-note">${t('analysis.note.max33')}</span></div>
          <div class="report-cell value-cell ${analysis.housingOk ? 'positive' : 'warning'}">
            ${formatPercent(analysis.housingRate)}
            ${analysis.housingOk ? '✓' : '⚠'}
          </div>
        </div>
        
        <div class="report-row">
          <div class="report-cell">${t('analysis.luxury')}</div>
          <div class="report-cell formula">${t('analysis.formula.luxury')}<br><span class="formula-note">${t('analysis.note.max33')}</span></div>
          <div class="report-cell value-cell ${analysis.luxuryOk ? 'positive' : 'warning'}">
            ${formatPercent(analysis.luxuryRate)}
            ${analysis.luxuryOk ? '✓' : '⚠'}
          </div>
        </div>
        
        <div class="report-row">
          <div class="report-cell">${t('analysis.assetYield')}</div>
          <div class="report-cell formula">${t('analysis.formula.assetYield')}</div>
          <div class="report-cell value-cell">
            ${formatPercent(analysis.assetYield)}
          </div>
        </div>
        
        <div class="report-row">
          <div class="report-cell">${t('analysis.security')}</div>
          <div class="report-cell formula">${t('analysis.formula.security')}<br><span class="formula-note">${t('analysis.note.months')}</span></div>
          <div class="report-cell value-cell">
            ${formatMonths(analysis.security)}
          </div>
        </div>
        
        <div class="report-row">
          <div class="report-cell">${t('analysis.expensesCoveredByPassiveIncome')}</div>
          <div class="report-cell formula">${t('analysis.formula.expensesCoveredByPassiveIncome')}<br><span class="formula-note">${t('analysis.note.target200')}</span></div>
          <div class="report-cell value-cell ${analysis.expensesCoveredTarget ? 'positive' : 'negative'}">
            ${formatPercent(analysis.expensesCoveredByPassiveIncomeRatio)}
            ${analysis.expensesCoveredTarget ? '✓' : '↓'}
          </div>
        </div>
      </div>
    </div>
  `;
}
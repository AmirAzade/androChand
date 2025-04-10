export const fetchCurrPrice = async (currency_setPrices, gold_setPrices, convert_setPrices, setShirini) => {
  try {
    const response = await fetch('https://api.chande.top/api/currency/');
    const data = await response.json();
    setShirini(false);

    // Process currencies
    const currencyPrices = {};
    data.data.forEach((currency) => {
      currencyPrices[currency.symbol.toLowerCase()] = {
        buy: currency.buy,
        sell: currency.sell,
        change: currency.change,
        history: currency.history,
      };
    });

    // Update state for currency prices
    currency_setPrices({
      usd: currencyPrices.usd.buy,
      usd_change: currencyPrices.usd.change,
      eur: currencyPrices.eur.buy,
      eur_change: currencyPrices.eur.change,
      gbp: currencyPrices.gbp.buy,
      gbp_change: currencyPrices.gbp.change,
      chf: currencyPrices.chf.buy,
      chf_change: currencyPrices.chf.change,
      cad: currencyPrices.cad.buy,
      cad_change: currencyPrices.cad.change,
      aud: currencyPrices.aud.buy,
      aud_change: currencyPrices.aud.change,
      sek: currencyPrices.sek.buy,
      sek_change: currencyPrices.sek.change,
      nok: currencyPrices.nok.buy,
      nok_change: currencyPrices.nok.change,
      rub: currencyPrices.rub.buy,
      rub_change: currencyPrices.rub.change,
      thb: currencyPrices.thb.buy,
      thb_change: currencyPrices.thb.change,
      sgd: currencyPrices.sgd.buy,
      sgd_change: currencyPrices.sgd.change,
      hkd: currencyPrices.hkd.buy,
      hkd_change: currencyPrices.hkd.change,

      azn: currencyPrices.azn.buy,
      azn_change: currencyPrices.azn.change,
      amd: currencyPrices.amd.buy,
      amd_change: currencyPrices.amd.change,
      dkk: currencyPrices.dkk.buy,
      dkk_change: currencyPrices.dkk.change,
      aed: currencyPrices.aed.buy,
      aed_change: currencyPrices.aed.change,
      jpy: currencyPrices.jpy.buy,
      jpy_change: currencyPrices.jpy.change,
      try: currencyPrices.try.buy,
      try_change: currencyPrices.try.change,
      cny: currencyPrices.cny.buy,
      cny_change: currencyPrices.cny.change,
      sar: currencyPrices.sar.buy,
      sar_change: currencyPrices.sar.change,
      inr: currencyPrices.inr.buy,
      inr_change: currencyPrices.inr.change,
      myr: currencyPrices.myr.buy,
      myr_change: currencyPrices.myr.change,
      afn: currencyPrices.afn.buy,
      afn_change: currencyPrices.afn.change,
      kwd: currencyPrices.kwd.buy,
      kwd_change: currencyPrices.kwd.change,
      iqd: currencyPrices.iqd.buy,
      iqd_change: currencyPrices.iqd.change,
      bhd: currencyPrices.bhd.buy,
      bhd_change: currencyPrices.bhd.change,
      omr: currencyPrices.omr.buy,
      omr_change: currencyPrices.omr.change,
      qar: currencyPrices.qar.buy,
      qar_change: currencyPrices.qar.change,

      usd_history: currencyPrices.usd.history,
      eur_history: currencyPrices.eur.history,
      gbp_history: currencyPrices.gbp.history,

      chf_history: currencyPrices.chf.history,
      cad_history: currencyPrices.cad.history,
      aud_history: currencyPrices.aud.history,
      sek_history: currencyPrices.sek.history,
      nok_history: currencyPrices.nok.history,
      rub_history: currencyPrices.rub.history,
      thb_history: currencyPrices.thb.history,
      sgd_history: currencyPrices.sgd.history,
      hkd_history: currencyPrices.hkd.history,

      azn_history: currencyPrices.azn.history,
      amd_history: currencyPrices.amd.history,
      dkk_history: currencyPrices.dkk.history,
      aed_history: currencyPrices.aed.history,
      jpy_history: currencyPrices.jpy.history,
      try_history: currencyPrices.try.history,
      cny_history: currencyPrices.cny.history,
      sar_history: currencyPrices.sar.history,
      inr_history: currencyPrices.inr.history,
      myr_history: currencyPrices.myr.history,
      afn_history: currencyPrices.afn.history,
      kwd_history: currencyPrices.kwd.history,
      iqd_history: currencyPrices.iqd.history,
      bhd_history: currencyPrices.bhd.history,
      omr_history: currencyPrices.omr.history,
      qar_history: currencyPrices.qar.history,
    });

    // Update state for gold prices
    gold_setPrices({
      emm: currencyPrices.emami1.buy,
      emm_change: currencyPrices.emami1.change,
      azd: currencyPrices.azadi1.buy,
      azd_change: currencyPrices.azadi1.change,
      nim: currencyPrices.azadi1_2.buy,
      nim_change: currencyPrices.azadi1_2.change,
      rob: currencyPrices.azadi1_4.buy,
      rob_change: currencyPrices.azadi1_4.change,
      grmi: currencyPrices.azadi1g.buy,
      grmi_change: currencyPrices.azadi1g.change,
      
      grm: currencyPrices.gol18.buy,
      grm_change: currencyPrices.gol18.change,
      mql: currencyPrices.mithqal.buy,
      mql_change: currencyPrices.mithqal.change,
      oz: currencyPrices.ounce.buy,
      oz_change: currencyPrices.ounce.change,

      emm_history: currencyPrices.emami1.history,
      azd_history: currencyPrices.azadi1.history,
      nim_history: currencyPrices.azadi1_2.history,
      rob_history: currencyPrices.azadi1_4.history,
      grmi_history: currencyPrices.azadi1g.history,

      grm_history: currencyPrices.gol18.history,
      mql_history: currencyPrices.mithqal.history,
      oz_history: currencyPrices.ounce.history,

      
      // Other gold-related prices if needed
    });

    // Update state for conversion prices
    convert_setPrices({
      irt: 1,
      usd: currencyPrices.usd.buy,
      eur: currencyPrices.eur.buy,
      gbp: currencyPrices.gbp.buy,
      chf: currencyPrices.chf.buy,
      cad: currencyPrices.cad.buy,
      aud: currencyPrices.aud.buy,
      sek: currencyPrices.sek.buy,
      nok: currencyPrices.nok.buy,
      rub: currencyPrices.rub.buy,
      thb: currencyPrices.thb.buy,
      sgd: currencyPrices.sgd.buy,
      hkd: currencyPrices.hkd.buy,

      azn: currencyPrices.azn.buy,
      amd: currencyPrices.amd.buy,
      dkk: currencyPrices.dkk.buy,
      aed: currencyPrices.aed.buy,
      jpy: currencyPrices.jpy.buy,
      try: currencyPrices.try.buy,
      cny: currencyPrices.cny.buy,
      sar: currencyPrices.sar.buy,
      inr: currencyPrices.inr.buy,
      myr: currencyPrices.myr.buy,
      afn: currencyPrices.afn.buy,
      kwd: currencyPrices.kwd.buy,
      iqd: currencyPrices.iqd.buy,
      bhd: currencyPrices.bhd.buy,
      omr: currencyPrices.omr.buy,
      qar: currencyPrices.qar.buy,
      // Add other currencies similarly
    });
  } catch (error) {
    console.error('Error fetching currency prices:', error);
  }
};

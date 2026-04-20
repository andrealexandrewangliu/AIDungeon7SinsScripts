InnerSelf("context");
const modifier = (text) => {
  // Trigger List
  const cardsToTrigger = [];
  var list_check = false;
  var check_aspect_unlock = false;
  var temple_card = false;
  var build_check = false;
  var craft_check = false;
  var summon_check = false;
  var class_list_check = false;
  var race_list_check = false;
  //var card_aspect_unlock_context = false;
  //var card_generic_summon_context = false;
  
  // prepare text for parsing
  const flatten = (s) =>
  s.replace(/\s+/g, " ").trim().toLowerCase();
  const original = text || "";
  const originalflat = flatten(original);

  // List of cards to check (lowercase)
  const core_card_name_dict = {};
  const core_card_key_dict = {};
  const sins = [];
  const aspects = [];
  const facilities = [];
  const classes = [];
  const races = [];

  // If we are iterating all card, let's map them all
  for (let i = storyCards.length - 1; -1 < i; i--) {
    const card = storyCards[i];
    if (card.type == 'Sin'){
      sins.push(card.title);
      core_card_name_dict[card.title] = card;
      core_card_key_dict[card.keys] = card;
    }else{if (card.type == 'Aspect'){
      aspects.push(card.title);
      core_card_name_dict[card.title] = card;
      core_card_key_dict[card.keys] = card;
    }else{if (card.type == 'Facility'){
      facilities.push(card.title);
      core_card_name_dict[card.title] = card;
      core_card_key_dict[card.keys] = card;
    }else{if (card.type == 'race'){
      races.push(card.title);
      //core_card_name_dict[card.title] = card;
      //core_card_key_dict[card.keys] = card;
    }else{if (card.type == 'class'){
      if ((!card.title.includes('Inner Self')) && (!card.title.includes('Auto-Cards')) && card.title != 'Hero' && card.title != 'Tyrant'){
        classes.push(card.title);
        //core_card_name_dict[card.title] = card;
        //core_card_key_dict[card.keys] = card;
      }
    }else{if (card.type == 'Catalogue'){
      if (card.keys == 'Trigger_Unlock_Aspect_Check'){
        //card_aspect_unlock_context = card
        core_card_name_dict[card.title] = card;
        core_card_key_dict[card.keys] = card;
      }
      if (card.keys == 'Trigger_Generic_Summon_Catalogue'){
        //card_generic_summon_context = card
        core_card_name_dict[card.title] = card;
        core_card_key_dict[card.keys] = card;
      }
      if (card.keys == 'Trigger_Facility_Catalogue'){
        //card_generic_summon_context = card
        core_card_name_dict[card.title] = card;
        core_card_key_dict[card.keys] = card;
      }
    }}}}}}
  }

  //fetch latest action
  var last_action = history[history.length-1];
  if (last_action.type == 'continue' || !last_action.type){ //if continue check atleast once before
    last_action = history[history.length-2];
  }
  if (last_action.type != 'continue' && last_action.type != 'start' && last_action.type){
    const normalized = last_action.text.toLowerCase();
    
    // Worship Hall is a Temple
    if (normalized.includes('temple') || normalized.includes('cathedral') || normalized.includes('shrine') || normalized.includes('chapel') || normalized.includes('worship hall')){
      const card = core_card_key_dict[`Facility_Worship_Hall`];
      temple_card = true;
      if (!cardsToTrigger.includes(card)){
        cardsToTrigger.push(card);  // Fetches/activates existing 
      }
    }
    if (normalized.includes('build') || normalized.includes('construct') || normalized.includes('create') || normalized.includes('spawn') || normalized.includes('assemble') || normalized.includes('make')){
      build_check = true;
    }
    if (normalized.includes('summon') || normalized.includes('invoke') || normalized.includes('create') || normalized.includes('spawn') || normalized.includes('make')){
      summon_check = true;
    }
    if (normalized.includes('craft') || normalized.includes('manufacture') || normalized.includes('create') || normalized.includes('assemble') || normalized.includes('make')){
      craft_check = true;
    }

    // HIDDEN ASPECT CHECK START 
    // Faith unlock check (build + temple)
    if (build_check && temple_card){
      const card = core_card_key_dict[`Aspect_Faith`];
      if (!cardsToTrigger.includes(card)){
        cardsToTrigger.push(card);  // Fetches/activates existing 
      }
      check_aspect_unlock = true;
    }
    if (normalized.includes('teleport') || normalized.includes('warp')){
      const card = core_card_key_dict[`Aspect_Spatial`];
      if (!cardsToTrigger.includes(card)){
        cardsToTrigger.push(card);  // Fetches/activates existing 
      }
      check_aspect_unlock = true;
    }

    // Industrial unlock check (build + production line)
    if (build_check && (normalized.includes('workflow') || normalized.includes('automation') || normalized.includes('production') || normalized.includes('industr')) ){
      const card = core_card_key_dict[`Aspect_Industrial`];
      if (!cardsToTrigger.includes(card)){
        cardsToTrigger.push(card);  // Fetches/activates existing 
      }
      check_aspect_unlock = true;
    }

    // Logical Circuitry unlock check (build + circuit board)
    if (craft_check && (normalized.includes('circuit') || normalized.includes('chip') || normalized.includes('compute') || normalized.includes('calculator') || normalized.includes('logic')) ){
      const card = core_card_key_dict[`Aspect_Logical_Circuitry`];
      if (!cardsToTrigger.includes(card)){
        cardsToTrigger.push(card);  // Fetches/activates existing 
      }
      check_aspect_unlock = true;
    }

    // Flying Dungeon unlock check (bribe goddess)
    if ((normalized.includes('donate') || normalized.includes('donating') || normalized.includes('bribe') || normalized.includes('bribing')) && (normalized.includes('chaos') || normalized.includes('goddess') || normalized.includes('godess') || normalized.includes('diety') || temple_card)){
      const card = core_card_key_dict[`Aspect_Flying_Dungeon`];
      if (!cardsToTrigger.includes(card)){
        cardsToTrigger.push(card);  // Fetches/activates existing 
      }
      check_aspect_unlock = true;
    }
    // HIDDEN ASPECT CHECK END
    list_check = normalized.includes('unlock') || normalized.includes('list') || normalized.includes('catalogue') || normalized.includes('check');
    // Call Aspect unlock check
    if (list_check && normalized.includes('aspect')){
      const card = core_card_key_dict[`Trigger_Unlock_Aspect_Check`];
      if (!cardsToTrigger.includes(card)){
        cardsToTrigger.push(card);  // Fetches/activates existing 
      }
      check_aspect_unlock = true;
    }
    // Call Facility List
    if (list_check && (normalized.includes('facility') || normalized.includes('facilities'))){
      const card = core_card_key_dict[`Trigger_Facility_Catalogue`];
      if (!cardsToTrigger.includes(card)){
        cardsToTrigger.push(card);  // Fetches/activates existing 
      }
    }

    // Class Check
    if (list_check && normalized.includes('class')){
      class_list_check = true;
    }
    if (list_check && normalized.includes('race')){
      race_list_check = true;
    }

    if (summon_check){
      const card = core_card_key_dict[`Trigger_Generic_Summon_Catalogue`];
      if (!cardsToTrigger.includes(card)){
        cardsToTrigger.push(card);  // Fetches/activates existing
      }
    }

    // Check if any sin, facility or aspect was mentioned to add to context, avoid duplicates
    for (const sin of sins) {
      if (normalized.includes(sin.toLowerCase())) {
        const name_under = sin.replace(' ','_');
        const card = core_card_key_dict[`Sin_${name_under}`];
        if (!cardsToTrigger.includes(card)){
          cardsToTrigger.push(card);  // Fetches/activates existing 
        }
      }
    }
    for (const facility of facilities) {
      if (normalized.includes(facility.toLowerCase())) {
        const name_under = facility.replace(' ','_');
        const card = core_card_key_dict[`Facility_${name_under}`];
        if (!cardsToTrigger.includes(card)){
          cardsToTrigger.push(card);  // Fetches/activates existing 
        }
      }
    }
    for (const aspect of aspects) {
      if (normalized.includes(aspect.toLowerCase())) {
        const name_under = aspect.replace(' ','_');
        const card = core_card_key_dict[`Aspect_${name_under}`];
        if (!cardsToTrigger.includes(card)){
          cardsToTrigger.push(card);  // Fetches/activates existing 
        }
      }
    }
  }
  if (state.memory.context){
    const normalized = state.memory.context.toLowerCase();
    for (const sin of sins) {
      if (normalized.includes(sin.toLowerCase())) {
        const name_under = sin.replace(' ','_');
        const card = core_card_key_dict[`Sin_${name_under}`];
        if (!cardsToTrigger.includes(card)){
          cardsToTrigger.push(card);  // Fetches/activates existing 
        }
      }
    }
  }
  
  [text, stop] = AutoCards("context", text, stop);
  // Any other context modifier scripts can go here
  if (cardsToTrigger.length >= 1 || class_list_check || race_list_check || check_aspect_unlock || summon_check || build_check){
    // Find Story Summary marker
    var idx = text.indexOf("\n\nStory Summary:");
    var before = text;
    var after = "";
    if (idx !== -1) {
      before = text.slice(0, idx);
      after = text.slice(idx);
    }
    else{
      idx = text.indexOf("\n\nRecent Story:");
      if (idx !== -1) {
        before = text.slice(0, idx);
        after = text.slice(idx);
      }
    }
    for (const card of cardsToTrigger){
      if (card != undefined){
        const flat_card = flatten(card.entry.toLowerCase())
        if (!originalflat.includes(flat_card)){
            before += "\n\n" + card.entry;
        }
      }
    }
    if (race_list_check){
      var race_list = 'List of Races:\n'
      for (const name of races){
        race_list += ` - ${name}\n`
      }
      before += "\n\n" + race_list;
    }
    if (class_list_check){
      var class_list = 'List of Classes:\n'
      for (const name of classes){
        class_list += ` - ${name}\n`
      }
      before += "\n\n" + class_list;
    }

    //ouput context for possible successfull unlock
    if (check_aspect_unlock){
      before += "\n\ncheck unlock aspect for non obtained aspects";

    }
    if (summon_check){
      before += "\n\ncheck if summoned monster is within requirements to be summoned";
    }
    if (build_check){
      before += "\n\ncheck if facility is possible to be constructed";
    }
    text = before + after;
  }

  //text += `\n\n DEBUG: ${state.memory.context}`
  return { text, stop };
};
modifier(text);

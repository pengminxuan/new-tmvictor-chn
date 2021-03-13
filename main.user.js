// ==UserScript==
// @name         Evolve-新版TMVictor汉化
// @namespace    https://gitee.com/angle_god/tmvictor-localization-chinese
// @version      1.0.3
// @description  try to take over the world!
// @downloadURL  https://github.com/pengminxuan/new-tmvictor-chn/blob/main/main.user.js
// @author       天使不见时
// @author       by22dgb
// @match        https://likexia.gitee.io/evolve/
// @match        https://wdjwxh.github.io/Evolve-Scripting-Edition/
// @match        https://wdjwxh.gitee.io/evolve-scripting-edition/
// @match        https://tmvictor.github.io/Evolve-Scripting-Edition/
// @match        https://pmotschmann.github.io/Evolve/
// @grant        none
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// ==/UserScript==

// 监听间隔
var LISTENER_TIME = 1000;

/**
 * 汉化配置
 *
 * 扒原文title语句：$("#配置项标签id值").find("*").each(function(index, e) {if($(e).attr('title')){console.log($(e).attr('title'))}})
 * 扒原文text语句：$("#配置项标签id值").find("*").each(function(index, e) {if($(e).prop('firstChild').nodeValue){console.log($(e).prop('firstChild').nodeValue)}})
 *
 * 页面中使用<br>换行文本汉化示例
 * 原文：Non-Bioseed: Ignore Space Dock, Bioseeder Ship and Probes<br>Bioseed: Ignore World Collider<br>Whitehole: Ignore Jump Ship
 * 配置项："Non-Bioseed: Ignore Space Dock, Bioseeder Ship and Probes": "非生物种子:忽略太空码头、生物播种船和探测器\n 生物种子:忽略世界超级对撞机\n 黑洞: 忽略跃迁飞船"
 */
var CNZ_MAP = {
    // 侧边栏
    "More script options available in Settings tab": "设置选项卡中可以进行更详细的设置",
    "masterScriptToggle": "启用脚本",
    "showSettings": "显示设置",
    "autoEvolution": "自动进化",
    "autoFight": "自动战斗",
    "autoHell": "自动地狱维度",
    "autoFleet": "自动仙女座舰队",
    "autoTax": "自动税率",
    "autoCraft": "自动锻造",
    "autoBuild": "自动建筑",
    "autoPower": "自动供能",
    "autoStorage": "自动存储",
    "autoMarket": "自动市场",
    "autoResearch": "自动研究",
    "autoARPA": "自动ARPA",
    "autoJobs": "自动工作",
    "autoCraftsmen": "自动工匠",
    "autoPylon": "自动水晶塔",
    "autoQuarry": "自动温石棉控制",
    "autoSmelter": "自动冶炼",
    "autoFactory": "自动工厂",
    "autoMiningDroid": "自动采矿机器人",
    "autoGraphenePlant": "自动石墨烯厂",
    "autoAssembleGene": "自动组装基因",
    "autoMinorTrait": "自动次要基因",
    "Prestige Options": "威望重置选项",
    "Bulk Sell": "批量销售",
    "Minimum money to keep :": "最低保留资金:",
    "Set": "设置",
    "Set %": "设置百分比",

    "Stop taking any actions on behalf of the player.": "在玩家需要的时候，停止所有脚本的活动。",
    "You can disable rendering of settings UI once you\'ve done with configuring script, if you experiencing performance issues. It can help a little.": "在设置选项卡中是否显示脚本相关设置。可能略微提升游戏速度。",
    "Runs through the evolution part of the game through to founding a settlement. In Auto Achievements mode will target races that you don\'t have extinction\\greatness achievements for yet.": "自动进行进化阶段。如果选择自动完成成就，则会优先考虑还未完成过毁灭类成就或者伟大类成就的种族。",
    "Sends troops to battle whenever Soldiers are full and there are no wounded. Adds to your offensive battalion and switches attack type when offensive rating is greater than the rating cutoff for that attack type.": "当士兵已满员且没有伤兵时让他们进行战斗。当战斗评级足够以后，会自动切换战役类型。",
    "Sends soldiers to hell and sends them out on patrols. Adjusts maximum number of powered attractors based on threat.": "将士兵派往地狱维度并自动分配巡逻队。根据恶魔生物数量自动调节吸引器信标的数量。",
    "Manages Andromeda fleet to supress piracy": "自动分配仙女座星系的舰队以压制海盗活动",
    "Adjusts tax rates if your current morale is greater than your maximum allowed morale. Will always keep morale above 100%.": "如果当前的士气高于上限，则会自动调整税率。会尽可能将士气保持在100%以上。",
    "Craft when a specified crafting ratio is met. This changes throughout the game - lower in the beginning and rising as the game progresses.": "资源到达某个比例以后自动将它们转换为锻造物。在游戏开始时比例较低，随着游戏进展而不断提升。",
    "Builds city and space building when it can an production allows (eg. Won\'t build a Fission Reactor if you don\'t have enough uranium production).": "当资源产量到达允许阈值时自动建造建筑(例如：如果铀产量不足，则不会建造裂变反应堆)。",
    "Manages power based on a priority order of buildings. Starts with city based building then space based.": "根据建筑的优先级自动管理供能。从地面建筑开始，然后再考虑太空建筑。",
    "Assigns crates to allow storage of resources.": "自动分配箱子来管理资源存储。",
    "Allows for automatic buying and selling of resources once specific ratios are met. Also allows setting up trade routes until a minimum specified money per second is reached. The will trade in and out in an attempt to maximise your trade routes.": "当资源到达某个比例以后自动买卖相应资源。也可以设置自动使用贸易路线进行交易，并且可以设置交易时最小的资金收入。将尽可能使用所有的贸易路线。",
    "Performs research when minimum requirements are met. ": "当满足相应条件时自动进行研究。",
    "Builds ARPA projects if user enables them to be built.": "自动建造玩家允许建造的ARPA项目。",
    "Assigns jobs in a priority order with multiple breakpoints. Starts with a few jobs each and works up from there. Will try to put a minimum number on lumber / stone then fill up capped jobs first.": "以相应优先级和多个阈值来自动分配工作。将先满足第一阈值后，再考虑第二阈值，然后再考虑最终阈值。在考虑其他工作前会先考虑伐木工人和石工数量。",
    "Enable this and autoJobs will also manage craftsmen.": "自动分配工匠。",
    "Manages pylon rituals": "自动管理水晶塔符文",
    "Manages rock quarry stone to chrysotile ratio for smoldering races": "烈焰种族自动管理石头和温石棉的比例",
    "Manages smelter output at different stages at the game.": "自动管理冶炼厂的生产。",
    "Manages factory production based on power and consumption. Produces alloys as a priority until nano-tubes then produces those as a priority.": "根据供能和消耗，自动管理工厂的生产。优先生产合金，直到纳米管解锁，之后优先生产这两种资源。",
    "Manages mining droid production.": "自动管理采矿机器人的生产。",
    "Uses what fuel it can to fuel the graphene plant. Not currently user configurable.": "自动管理石墨烯厂的燃料。暂时无法手动控制。",
    "Automatically assembles genes only when your knowledge is at max. Stops when DNA Sequencing is researched.": "当知识满了以后，自动进行基因重组。进行首次测序时不生效。",
    "Purchase minor traits using genes according to their weighting settings.": "根据相应的权重，自动使用基因购买次要特质。",
    "eg. 10 equals 10%": "例如：10代表10%",

    // 威望重置设置
    "Prestige Settings": "威望重置设置",
    "Reset Prestige Settings": "威望重置设置还原",
    "Prestige Type:": "威望重置类型：",
    "None": "无",
    "Mutual Assured Destruction": "核弹重置",
    "Bioseed": "播种重置",
    "Whitehole": "黑洞重置",
    "Ascension": "飞升重置",
    "Non-Bioseed: Ignore Space Dock, Bioseeder Ship and Probes": "非播种重置：不建造星际船坞、生命播种飞船和星际探测器\n 播种重置：不建造世界超级对撞机\n 黑洞重置：不建造跃迁飞船",
    "Pre-MAD: Ignore A.R.P.A.": "是否在研究相互毁灭前不建造ARPA项目",
    "Wait for maximum population": "是否等待人口达到最大",
    "Required probes": "播种前至少需要的太空探测器数量",
    "Required minimum solar mass": "太阳质量阈值，达到后才会进行黑洞重置",
    "Stabilise blackhole until minimum solar mass reached": "是否在达到太阳质量阈值之前，一直稳定黑洞",
    "Enable mass ejector": "是否自动进行质量喷射",
    "Eject excess resources": "是否喷射多余的资源",
    "(Decay Challenge) Eject rate": "(衰变挑战)喷射比例",
    "Eject everything once X mass ejectors constructed": "当质量喷射器数量达到指定值以后，无视其他设置，喷射最大质量的物质",

    "Endless game": "不会自动重置",
    "MAD prestige once MAD has been researched and all soldiers are home": "当研究相互毁灭，且士兵全部存活时，进行核弹重置",
    "Launches the bioseeder ship to perform prestige when required probes have been constructed": "当太空探测器数量达到指定值以后，进行播种重置",
    "Infuses the blackhole with exotic materials to perform prestige": "自动选择奇异灌输，触发黑洞重置",
    "Allows research of Incorporeal Existence and Ascension. Ascension Machine managed by autoPower. User input still required to trigger reset, and create custom race.": "允许研究无形存在和飞升。飞升装置由自动供能进行管理。仍然需要玩家手动触发飞升并创建自建种族。",
    "Construct the space dock, bioseeder ship segments and probes only when bioseed is current prestige goal, and skip building world collider": "只在需要进行播种重置时建造星际船坞、生命播种飞船和星际探测器，并且不建造世界超级对撞机",
    "Disables building A.R.P.A. projects untill MAD is researched": "直到研究相互毁灭之前，不建造ARPA项目",
    "Wait for maximum population and soldiers to maximize plasmids gain": "等待市民和士兵达到最大以后再进行重置，以尽可能多地获得质粒",
    "Required number of probes before launching bioseeder ship": "达到太空探测器所需数量后，才进行播种重置",
    "Required minimum solar mass of blackhole before prestiging": "达到太阳质量阈值后，才进行黑洞重置",
    "Stabilises the blackhole with exotic materials until minimum solar mass is reached": "达到太阳质量阈值之前，不会选择奇异灌输，而会一直选择稳定黑洞",
    "If not enabled the mass ejector will not be managed by the script": "启用后，脚本才会自动管理质量喷射器喷射的物质",
    "Eject resources above amount required for buildings, normally only resources with full storages will be ejected, until 'Eject everything' option is activated.": "将超出建筑需要的资源用于喷射，而不是像通常只是喷射达到上限的资源。",
    "Set amount of ejected resources up to this percent of decay rate, only useful during Decay Challenge": "只要衰变比例高于这个数值，就会使用相应资源进行喷射，只在衰变挑战中有效。",
    "Once we've constructed X mass ejectors the eject as much of everything as possible": "当质量喷射器数量达到指定值以后，尽可能的喷射最大质量的物质",

    // 常规设置
    "General Settings": "常规设置",
    "Reset General Settings": "常规设置还原",
    "Prioritize resources for triggers": "资源是否优先分配给触发器",
    "Prioritize resources for queue": "资源是否优先分配给队列",
    "Prioritize resources for Pre-MAD researches": "资源是否优先分配给相互毁灭前的研究",
    "Prioritize resources for Space+ researches": "资源是否优先分配给太空后的研究",
    "Prioritize resources for missions": "资源是否优先分配给任务",
    "Always assemble genes": "是否总是用脚本进行基因组装",
    "Always autoclick resources": "是否总是自动收集资源",
    "Maximum clicks per second": "每秒最高点击次数",

    "Readjust trade routes and production to resources required for active triggers": "将贸易路线和生产资源调整为触发器所需要的资源",
    "Readjust trade routes and production to resources required for buildings and researches in queue": "将贸易路线和生产资源调整为队列中的建筑和研究所需要的资源",
    "Readjust trade routes and production to resources required for unlocked and affordable researches": "将贸易路线和生产资源调整为已解锁且上限足够的研究所需要的资源",
    "Readjust trade routes and production to resources required for unlocked and affordable missions": "将贸易路线和生产资源调整为已解锁且上限足够的任务所需要的资源",
    "Will continue assembling genes even after De Novo Sequencing is researched": "即使研究自动组装基因后，仍然用脚本进行基因组装",
    "By default script will click only during early stage of autoBuild, to bootstrap production. With this toggled on it will continue clicking forever": "默认情况下脚本只在游戏初期自动收集资源，开启此项后将一直自动收集资源",
    "Number of clicks performed at once, each second. Hardcapped by amount of missed resources": "每秒自动收集资源的点击次数。上限为当前资源数量与库存上限的差值",

    // 政府设置
    "Government Settings": "政府设置",
    "Reset Government Settings": "政府设置还原",
    "Minimum allowed tax rate": "最低允许税率",
    "Minimum allowed morale": "最低允许士气",
    "Maximum allowed morale": "最高允许士气",
    "Manage changes of government": "是否管理社会体制变化",
    "Interim Government:": "临时社会体制：",
    "Second Government:": "第二社会体制：",
    "Space Government:": "太空社会体制：",

    "Minimum tax rate for autoTax. Will still go below this amount if money storage is full": "自动税率使用的最低税率。如果资金满了，将可能低于此数值。",
    "Use this to set a minimum allowed morale. Remember that less than 100% can cause riots and weather can cause sudden swings": "设置最低允许的士气。少于100%士气可能引起税收抵制，请尽量不要设置到100%以下。另外请记得天气的影响",
    "Use this to set a maximum allowed morale. The tax rate will be raised to lower morale to this maximum": "设置最高允许的士气。如果士气超过此数值，将提高税率",
    "Manage changes of government when they become available": "当可能的时候，自动改变社会体制",
    "Temporary low tier government until you research other governments": "当研究其他社会体制之前，用于过渡的临时社会体制",
    "Second government choice, chosen once becomes avaiable. Can be the same as above": "第二社会体制，当此社会体制可用后立刻进行切换。可以与上面的社会体制相同。",
    "Government for bioseed+. Chosen once you researched Quantum Manufacturing. Can be the same as above": "用于播种之后的社会体制，当研究量子制造以后立刻进行切换。可以与上面的社会体制相同。",

    // 进化设置
    "Evolution Settings": "进化设置",
    "Reset Evolution Settings": "进化设置还原",
    "Target Universe:": "欲选择的宇宙：",
    "Target Planet:": "欲选择的星球：",
    "Target Evolution:": "欲进化的种族：",
    "Soft Reset": "是否进行软重置",
    "No Plasmids": "是否激活关闭质粒效果",
    "Weak Mastery": "是否激活弱精通效果",
    "No Trade": "是否激活关闭自由贸易",
    "No Manual Crafting": "是否激活关闭手工制作",
    "Reduced CRISPER": "是否激活CRISPR弱折扣",
    "Joyless": "是否激活无趣",
    "Decay": "是否激活衰变",
    "Steelen": "是否激活禁钢",
    "EM Field": "是否激活E.M.磁场",
    "Cataclysm": "是否激活大灾变",
    "Genetic Dead End": "是否激活遗传绝境",
    "Evolution Queue": "进化队列",
    "Queue Enabled": "是否开启进化队列",
    "Prestige for new evolutions:": "新一轮进化使用的威望重置类型：",
    "Current Prestige": "当前的威望重置类型",
    "Add New Evolution": "添加进化队列",
    "Race": "种族",
    "Settings": "设置",
    "Auto Achievements (Extinction)": "自动成就(毁灭类)",
    "Auto Achievements (Greatness)": "自动成就(伟大类)",

    "Wait for user selection": "等待玩家选择",
    "Picks most habitable planet, based on biome and trait": "根据生物群系和星球特性，选择最佳的星球",
    "Picks planet with most unearned achievements. Takes in account extinction achievements for planet exclusive races, and greatness achievements for planet biome, trait, and exclusive genus.": "选择可以尽可能多完成成就的星球。将考虑毁灭类成就中星球特有的种族，以及伟大类成就中生物群系，星球特征和特有的种群。",
    "Picks planet with highest weighting. Should be configured in Planet Weighting Settings section.": "选择星球权重最高的星球。可以在下面的星球权重设置中进行更进一步的设置。",
    "Picks race with unearned Greatness achievement for bioseed runs, or with unearned Extinction achievement in other cases. Conditional races are prioritized, when available.": "优先选择还没有完成伟大类成就的种群，其他情况下会优先选择还没有完成毁灭类成就的种族。特有的种族如果可以选择，将优先进行选择。",
    "Perform soft resets untill you'll get chosen race. Useless after getting mass exintion perk.": "直到选中想要选择的种族之前一直进行软重置。在获得大灭绝特权后就没有必要选择了。",
    "When enabled script with evolve with queued settings, from top to bottom. During that script settings will be overriden with settings stored in queue. Queued target will be removed from list after evolution.": "按照队列从上至下进行进化。队列中有项目存在时，优先于脚本的进化设置生效。在完成进化后，相应的队列项目将被移除。",
    "Inherited from current Prestige Settings": "与当前的威望重置类型一致",

    // 星球独有种族警告
    "Warning! This race have special requirements: Hellscape planet. This condition is currently met.": "警告！此种族的特殊要求为：地狱星球。当前满足此条件。",
    "Warning! This race have special requirements: Eden planet. This condition is currently met.": "警告！此种族的特殊要求为：伊甸园星球。当前满足此条件。",
    "Warning! This race have special requirements: Oceanic planet. This condition is currently met.": "警告！此种族的特殊要求为：海洋星球。当前满足此条件。",
    "Warning! This race have special requirements: Challenge genes unlocked. This condition is currently met.": "警告！此种族的特殊要求为：已解锁相应挑战基因。当前满足此条件。",
    "Warning! This race have special requirements: Forest planet. This condition is currently met.": "警告！此种族的特殊要求为：森林星球。当前满足此条件。",
    "Warning! This race have special requirements: Volcanic planet. This condition is currently met.": "警告！此种族的特殊要求为：火山星球。当前满足此条件。",
    "Warning! This race have special requirements: Tundra planet. This condition is currently met.": "警告！此种族的特殊要求为：苔原星球。当前满足此条件。",
    "Warning! This race have special requirements: Desert planet. This condition is currently met.": "警告！此种族的特殊要求为：沙漠星球。当前满足此条件。",
    "Warning! This race have special requirements: Custom designed race. This condition is currently met.": "警告！此种族的特殊要求为：已解锁自建种族。当前满足此条件。",
    "Warning! This race have special requirements: Hellscape planet. This condition is currently not met.": "警告！此种族的特殊要求为：地狱星球。当前不满足此条件。",
    "Warning! This race have special requirements: Eden planet. This condition is currently not met.": "警告！此种族的特殊要求为：伊甸园星球。当前不满足此条件。",
    "Warning! This race have special requirements: Oceanic planet. This condition is currently not met.": "警告！此种族的特殊要求为：海洋星球。当前不满足此条件。",
    "Warning! This race have special requirements: Challenge genes unlocked. This condition is currently not met.": "警告！此种族的特殊要求为：已解锁相应挑战基因。当前不满足此条件。",
    "Warning! This race have special requirements: Forest planet. This condition is currently not met.": "警告！此种族的特殊要求为：森林星球。当前不满足此条件。",
    "Warning! This race have special requirements: Volcanic planet. This condition is currently not met.": "警告！此种族的特殊要求为：火山星球。当前不满足此条件。",
    "Warning! This race have special requirements: Tundra planet. This condition is currently not met.": "警告！此种族的特殊要求为：苔原星球。当前不满足此条件。",
    "Warning! This race have special requirements: Desert planet. This condition is currently not met.": "警告！此种族的特殊要求为：沙漠星球。当前不满足此条件。",
    "Warning! This race have special requirements: Custom designed race. This condition is currently not met.": "警告！此种族的特殊要求为：已解锁自建种族。当前不满足此条件。",

    "Challenge mode - no plasmids": "挑战模式-关闭质粒效果",
    "Challenge mode - weak mastery": "挑战模式-弱精通效果",
    "Challenge mode - no trade": "挑战模式-关闭自由贸易",
    "Challenge mode - no manual crafting": "挑战模式-关闭手工制作",
    "Challenge mode - reduced CRISPER effects": "挑战模式-CRISPR弱折扣",
    "Challenge mode - joyless": "挑战模式-无趣",
    "Challenge mode - decay": "挑战模式-衰变",
    "Challenge mode - steelen": "挑战模式-禁钢",
    "Challenge mode - electromagnetic field disruption": "挑战模式-E.M.磁场",
    "Challenge mode - shattered world (no homeworld)": "挑战模式-大灾变",
    "Challenge mode - genetic dead end (Valdi)": "挑战模式-遗传绝境(瓦尔迪)",

    // 星球权重设置
    "Planet Weighting Settings": "星球权重设置",
    "Reset Planet Weighting Settings": "星球权重设置还原",
    "Planet Weighting = Biome Weighting + Trait Weighting + (Extras Intensity * Extras Weightings)": "星球权重 = 群系权重 + 特性权重 + (其他项数值 * 其他项权重)",
    "Biome": "群系",
    "Trait": "特性",
    "Extra": "其他",
    "Achievement": "成就",

    // 次要特质设置
    "Minor Trait Settings": "次要特质设置",
    "Reset Minor Trait Settings": "次要特质设置还原",
    "Minor Trait": "次要特质",

    // 触发器设置
    "Trigger Settings": "触发器设置",
    "Reset Trigger Settings": "触发器设置还原",
    "Add New Trigger": "添加新触发器",
    "Trigger": "触发器",
    "Requirement": "需求",
    "Action": "行动",
    "Type": "类型",
    "Id": "Id",
    "Count": "计数",
    "Technology": "研究",
    "Built": "建造时",
    "Researched": "研究后",
    "Unlocked": "解锁时",

    // 研究设置
    "Research Settings": "研究设置",
    "Reset Research Settings": "研究设置还原",
    "Target Theology 1:": "神学研究分支1",
    "Anthropology": "人类学",
    "Fanaticism": "狂热信仰",
    "Target Theology 2:": "神学研究分支2",
    "Study": "研究先祖",
    "Deify": "神化先祖",
    /*"Target Unification:": "统一方式",
    "Reject": "拒绝",
    "Money": "资金（或收购）",
    "Morale": "吞并",
    "Conquest": "征服",*/
    "Research Alien Gift": "研究外星礼物科技",

    // 外交事务设置
    "Foreign Affairs Settings": "外交事务设置",
    "Reset Foreign Affairs Settings": "外交事务设置还原",
    "Foreign Powers": "外国势力相关",
    "foreign power 1": "外国势力1",
    "foreign power 2": "外国势力2",
    "foreign power 3": "外国势力3",
    "Attack": "进攻",
    "Occupy when possible": "尽量占领",
    "Train spies": "派遣间谍",
    "Maximum spies": "最大间谍数",
    "Espionage Mission:": "间谍任务",
    "None": "无",
    "Round Robin": "脚本循环",
    "Campaigns": "战役相关",
    "Attack only if at least this percentage of your garrison soldiers are alive": "只在驻扎士兵生存人数大于此比例时进攻",
    "... and at least this percentage of your garrison is not injured": "...且需要未受伤士兵人数大于此比例",
    "Hire mercenary if money storage greater than percent": "如果资金存量大于此比例，则聘请雇佣兵",
    "AND if cost lower than amount": "且需要雇佣费用低于此数值",
    "Campaign": "战役规模",
    "Minimum Attack Rating": "最低战斗评级",
    "Maximum Rating to Send": "最高战斗评级",
    "Ambush": "伏击",
    "Raid": "袭击",
    "Pillage": "抢劫",
    "Assault": "突击",
    "Siege": "围城",

    "Allow attacks against this foreign power. If occupied it will unoccupy just before attacking": "可以攻击此外国势力。如果已被占领，则攻击前会先取消占领",
    "Attempts to occupy this foreign power when available": "如果可能，尝试占领此外国势力",
    "Train spies to use against foreign powers": "训练间谍用于在外国势力执行任务",
    "Maximum spies send against this foreign power": "用于此外国势力的最大间谍数",
    "Perform this espionage mission whenever available": "如果可能，执行此间谍任务",
    "Only attacks if you ALSO have the target battalion size of healthy soldiers available, so this setting will only take effect if your battalion does not include all of your soldiers": "下方的未受伤士兵比例也会生效，因此只在未让所有士兵进攻时生效",
    "Set to less than 100 to take advantage of being able to heal more soldiers in a game day than get wounded in a typical attack": "合理设置为某个低于100的值，可以有效利用游戏内的自然愈合机制",
    "Hire a mercenary if money storage is greater than this percent": "如果资金存量大于此比例，则聘请雇佣兵",
    "Combines with the money storage percent setting to determine when to hire mercenaries": "结合资金存量比例，可以管理聘请雇佣兵的时机",

    "Pacifist": "和平主义者",
    "Perform unification": null,
    "Occupy last foreign power": null,
    "Military Power to switch target": null,
    "Inferior Power:": null,
    "Superior Power:": null,
    "Ignore": null,
    "Influence": null,
    "Sabotage": null,
    "Incite": null,
    "Annex": null,
    "Purchase": null,
    "Occupy": null,
    "Sabotage foreign power when useful": null,
    "OR if cost lower than money earned in X seconds": null,
    "Minimum advantage": null,
    "Maximum advantage": null,
    "Maximum siege battalion": null,

    // 地狱设置
    "Hell Settings": "地狱维度设置",
    "Reset Hell Settings": "地狱维度设置还原",
    "Entering Hell": "进入地狱维度",
    "Turn off patrol and surveyor log messages": "关闭巡逻队和勘探者相关的日志",
    "Automatically enter hell and adjust patrol count and hell garrison size": "自动进入地狱维度并调整巡逻队数量和规模",
    "Soldiers to stay out of hell": "不进入地狱维度的士兵人数",
    "Minimum soldiers to be available for hell (pull out if below)": "进入地狱维度最少士兵总数(低于此值时撤出)",
    "Alive soldier percentage for entering hell (only prevents entering, walls also have to be 100%)": "进入地狱维度生存士兵比例(只控制进入，城墙剩余耐久需要为100%)",
    "Hell Garrison": "地狱维度驻扎士兵",
    "Target wall damage per siege (overestimates threat)": "围攻减少城墙耐久(尽量高估威胁)",
    "Garrison bolster factor for damaged walls": "受损城墙驻扎士兵增援因子",
    "Patrol Size": "巡逻队规模",
    "Automatically adjust patrol size": "自动调整巡逻队规模",
    "Minimum patrol attack rating": "单支巡逻队最低战斗评级",
    "Percent of current threat as base patrol rating": "恶魔生物基础评级与数量比例",
    "Lower Rating for each active Predator Drone by": "每个掠食者无人机减少恶魔生物评级",
    "Lower Rating for each active War Droid by": "每个战斗机器人减少恶魔生物评级",
    "Lower Rating for each Bootcamp by": "每个新兵训练营减少恶魔生物评级",
    "Increase patrol rating by up to this when soldiers die": "士兵阵亡时增加巡逻队战斗评级至此数值",
    "Start increasing patrol rating at this home garrison fill percent": "当驻军到达此比例时开始增加巡逻队战斗评级",
    "Full patrol rating increase below this home garrison fill percent": "当驻军低于此比例时将巡逻队战斗评级增加到最大",
    "Attractors": "吸引器信标",
    "Adapt how many Attractors Auto Power can turn on based on threat": "使自动供能可以根据恶魔生物数量调整吸引器信标的供能状态",
    "All Attractors on below this threat": "恶魔生物数量低于此数值时开启所有吸引器信标",
    "All Attractors off above this threat": "恶魔生物数量高于此数值时关闭所有吸引器信标",

    "Automatically turns off the hell patrol and surveyor log messages": "自动关闭巡逻队和勘探者相关的日志",
    "Sets patrol count according to required garrison and patrol size": "根据需要的驻扎士兵和巡逻队规模调整巡逻队数量",
    "Home garrison maximum": "驻军上限",
    "Don't enter hell if not enough soldiers, or get out if already in": "如果士兵不足，不进入地狱维度，如果已经进入，则撤出所有士兵",
    "Don't enter hell if too many soldiers are dead, but don't get out": "如果阵亡士兵过多，不进入地狱维度，但不会撤出士兵",
    "Actual damage will usually be lower due to patrols and drones": "实际上由于有巡逻队和机器人，耐久不会减少那么多",
    "Multiplies target defense rating by this when close to 0 wall integrity, half as much increase at half integrity": "当城墙剩余耐久接近0时，将堡垒防御评级增强到乘以此因子的数值，城墙剩余耐久为一半时，增强到乘以此因子一半的数值",
    "Sets patrol attack rating based on current threat, lowers it depending on buildings, increases it to the minimum rating, and finally increases it based on dead soldiers. Handling patrol count has to be turned on.": "根据当前恶魔生物数量调整巡逻队规模，建筑作用下将减少之，低于最低战斗评级及士兵阵亡时将增加之。必须开启调整巡逻队数量。",
    "Will never go below this": "不会低于此数值",
    "Demon encounters have a rating of 2 to 10 percent of current threat": "作为参考，每次激战的恶魔评级为当前恶魔数量的2%至10%",
    "Predators reduce threat before patrols fight": "掠食者无人机在巡逻队战斗前就减少恶魔生物数量",
    "War Droids boost patrol attack rating by 1 or 2 soldiers depending on tech": "根据研究情况，战斗机器人可以增加1至2名士兵的巡逻队战斗评级",
    "Bootcamps help regenerate soldiers faster": "新兵训练营使士兵更快完成训练",
    "Larger patrols are less effective, but also have fewer deaths": "更大的巡逻队效率更低，但阵亡也更少",
    "This is the higher number": "较高数值",
    "This is the lower number": "较低数值",
    "Auto Power needs to be on for this to work": "需要开启自动供能此项才能生效",
    "Turn more and more attractors off when getting nearer to the top threat": "越接近最大恶魔数量，关闭越多吸引器信标",

    "Alive soldier percentage for entering hell": null,

    // 舰队设置
    "Fleet Settings": "舰队设置",
    "Reset Fleet Settings": "舰队设置还原",
    "Region": "地区",
    "Priority": "优先级",

    // 质量喷射设置
    "Mass Ejector Settings": "质量喷射设置",
    "Reset Mass Ejector Settings": "质量喷射设置还原",
    "Atomic Mass": "原子质量",
    "Allow Eject": "允许喷射",
    "Mass per unit:": "每单位质量",

    // 市场设置
    "Market Settings": "市场设置",
    "Reset Market Settings": "市场设置还原",
    "Trade minimum money /s": "贸易允许的每秒资金收入最低值",
    "Trade minimum money percentage /s": "贸易允许的每秒资金收入最低比例",
    "Resource": "资源名称",
    "Buy": "是否购买",
    "Sell": "是否出售",
    "Trade For": "贸易路线购买",
    "Trade Away": "贸易路线出售",
    "Ratio": "比例",
    "Routes": "贸易路线数",
    "Min p/s": "资源收入保留",

    "Uses the highest per second amount of these two values. Will trade for resources until this minimum money per second amount is hit": "两项中较高的数值生效。达到每秒资金收入最低值后，才会购买资源",
    "Uses the highest per second amount of these two values. Will trade for resources until this percentage of your money per second amount is hit": "两项中较高的数值生效。达到每秒资金收入最低比例后，才会购买资源",

    "Galaxy Trades": "星际贸易",
    "Manage Galaxy Trades": "脚本管理星际贸易",

    // 存储设置
    "Storage Settings": "存储设置",
    "Reset Storage Settings": "存储设置还原",
    "Limit Pre-MAD Storage": "限制核弹重置之前阶段的存储",
    "Reassign only empty storages": "仅重新分配空闲箱子",
    "Store Overflow": null,
    "Enabled": "是否启用",
    "Weighting": "权重",
    "Max Crates": "最大板条箱",
    "Max Containers": "最大集装箱",

    "Saves resources and shortens run time by limiting storage pre-MAD": "限制核弹重置之前阶段的存储来节省资源和相应时间",

    // 生产设置
    "Production Settings": "生产设置",
    "Reset Production Settings": "生产设置还原",
    "Fuel": "燃料使用顺序",
    "Override and produce money if we can't fill factories with other production": "如果其他资源储量已满，则无视相关设置，生产资金",

    "If all other production has been allocated and there are leftover factories then use them to produce money": "其他资源储量满以后，使用工厂生产资金。",

    "Smelter": "冶炼厂",
    "Foundry": "铸造厂",
    "Factory": "工厂",
    "Pylon": "水晶塔",
    "Distributing:": "分配",
    "Prioritize Iron": "优先炼铁",
    "Prioritize Steel": "优先炼钢",
    "Both, up to full storages": "同时冶炼，直到仓储上限",
    "Both, up to required amounts": "同时冶炼，直到需求数量",
    "Star Power": "星辰",
    "Prioritize demanded craftables": "优先制造需求的锻造物",
    "Min Ingredients": "最小原料保持比例",
    "Mining Drone": "采矿机器人",
    "Wait for full mana": "等待法力回复至上限",
    "Ritual": "仪式",

    // 工作设置
    "Job Settings": "工作设置",
    "Reset Job Settings": "工作设置还原",
    "Set default job": "设置默认工作",
    "Final Lumberjack Weighting": "最终伐木工人权重",
    "Final Quarry Worker Weighting": "最终石工权重",
    "Final Crystal Miner Weighting": "最终水晶矿工权重",
    "Final Scavenger Weighting": "最终清道夫权重",
    "Job": "工作",
    "1st Pass Max": "第一阈值",
    "2nd Pass Max": "第二阈值",
    "Final Max": "最终阈值",
    "Farmer": "农民",
    "Managed": "脚本自动管理",
    "Lumberjack": "伐木工人",
    "Quarry Worker": "石工",
    "Crystal Miner": "水晶矿工",
    "Scavenger": "清道夫",
    "Plywood Crafter": "胶合板工匠",
    "Brick Crafter": "砌砖工匠",
    "Wrought Iron Crafter": "锻铁工匠",
    "Sheet Metal Crafter": "金属板工匠",
    "Mythril Crafter": "秘银工匠",
    "Aerogel Crafter": "气凝胶工匠",
    "Nanoweave Crafter": "纳米织物工匠",
    "Scarletite Crafter": "绯绯色金工匠",
    "Entertainer": "艺人",
    "Scientist": "科学家",
    "Professor": "教授",
    "Cement Worker": "水泥工人",
    "Miner": "矿工",
    "Coal Miner": "煤矿工人",
    "Banker": "银行家",
    "Colonist": "行星居民",
    "Space Miner": "太空矿工",
    "Hell Surveyor": "勘探者",
    "Priest": "牧师",
    "Archaeologist": "考古学家",

    "Automatically sets the default job in order of Quarry Worker -> Lumberjack -> Crystal Miner -> Scavenger -> Farmer": "自动以石工->伐木工人->水晶矿工->清道夫->农民的顺序设置默认工作",
    "AFTER allocating breakpoints this weighting will be used to split lumberjacks, quarry workers, crystal miners and scavengers": "用于分配伐木工人，石工，水晶矿工和清道夫的数量",

    // 建筑设置
    "Building Settings": "建筑设置",
    "Reset Building Settings": "建筑设置还原",
    "Building": "建筑物",
    "Auto Build": "是否自动建造",
    "Max Build": "建造上限",
    "Manage State": "是否管理供能",
    "All Buildings": "所有建筑物",

    "Ignore weighting and build if storage is full": "如果仓储已满，则忽略权重进行建造",
    "Prefered Shrine:": "圣地种类偏好",
    "Any": "任意建造",
    "Equally": "平均分配",
    "Morale": "士气",
    "Metal": "金属",
    "Knowledge": "知识",
    "Tax": "税收",

    // 自动建筑权重设置
    "AutoBuild Weighting Settings": "自动建筑权重设置",
    "Reset AutoBuild Weighting Settings": "自动建筑权重设置还原",
    "Target": "目标",
    "Condition": "条件",
    "Multiplier": "乘数",
    "New building": "新建筑",
    "Powered building": "用电建筑",
    "Low available energy": "剩余电量不足",
    "Power plant": "发电厂",
    "Producing more energy than required": "生产的电力超过需求",
    "Knowledge storage": "科研建筑",
    "Have unlocked unafforable researches": "知识上限不满足可研究的科技",
    "All unlocked researches already affordable": "知识上限满足所有可研究的科技",
    "Mass Ejector": "质量喷射器",
    "Existed ejectors not fully utilized": "已有的喷射器尚未满负荷使用",
    "Not housing or barrack": "提升人口与兵力之外的所有建筑",
    "MAD prestige enabled, and affordable": "自动核爆重置激活，且相互毁灭已研发",
    "Freight Yard, Container Port": "货场与集装箱港口",
    "Have unused crates or containers": "有未使用的板条箱或集装箱",
    "All fuel depots": "所有燃料仓库",
    "Missing Oil or Helium for techs and missions": "当科研与探索任务所需石油、氦3等储量上限不足时",
    "Building with state (city)": "可激活建筑（地面）",
    "Some instances of this building are not working": "该建筑并未全部激活",
    "Building with state (space)": "可激活建筑（太空）",
    "Conflicts for some resource with active trigger or queue": "与队列中的建筑或触发器所需资源发生冲突",
    "Missing consumables or support to operate": "缺乏燃料，消耗品，或支持",

    // ARPA设置
    "A.R.P.A. Settings": "ARPA设置",
    "Reset A.R.P.A. Settings": "ARPA设置还原",
    "Override and build if storage is full": "如果储量已满，则无视其他设置，进行建造",
    "Minimum craftables to keep if overriding": "至少需要相应锻造物数量，才可无视其他设置",
    "Maximim percent of resources if overriding": "如果无视其他设置，至多使用的资源比例",
    "Project": "项目",
    "Ignore Min Money": "忽略最低金钱",
    "Supercollider": "超级对撞机",
    "Stock Exchange": "证券交易所",
    "Monument": "纪念碑",
    "Railway": "铁路",
    "Launch Facility": "发射设施",

    "Overrides the below settings to still build A.R.P.A projects if resources are full": "如果储量已满，则无视下方设置，仍然进行ARPA项目的建造",
    "A.R.P.A. projects that require crafted resources won't override and build if resources are below this amount": "如果锻造物低于此数值，相应的ARPA项目不会无视下方设置进行建造",
    "A.R.P.A. project that require more than this percentage of a non-crafted resource won't override and build": "如果资源花费的比例高于此数值，相应的ARPA项目不会无视下方设置进行建造",

    // 日志设置
    "Logging Settings": "日志设置",
    "Reset Logging Settings": "日志设置还原",
    "Enable logging": "是否启用日志，下方设置为相关日志类型",
    "Specials": "特殊",
    "Construction": "建造",
    "Multi-part Construction": "分项工程",
    "Research": "研究",
    "Spying": "间谍",
    "Mercenaries": "雇佣兵",

    "Master switch to enable logging of script actions in the game message queue": "日志记录的主开关",
    "If logging is enabled then logs Specials actions": "启用后，记录特殊操作",
    "If logging is enabled then logs Construction actions": "启用后，记录建造操作",
    "If logging is enabled then logs Multi-part Construction actions": "启用后，记录分项工程建造操作",
    "If logging is enabled then logs Research actions": "启用后，记录研究操作",
    "If logging is enabled then logs Spying actions": "启用后，记录间谍活动",
    "If logging is enabled then logs Attack actions": "启用后，记录进攻行为",
    "If logging is enabled then logs Mercenaries actions": "启用后，记录雇佣兵操作",

    // 种族
    "Script Managed": "由脚本管理",
    "Auto Achievements": "自动完成成就",
    "Antid": "蚂蚁人",
    "Mantis": "螳螂人",
    "Scorpid": "蝎子",
    "Human": "人类",
    "Orc": "兽人",
    "Elf": "精灵",
    "Troll": "巨魔",
    "Ogre": "食人魔",
    "Cyclops": "独眼巨人",
    "Kobold": "狗头人",
    "Goblin": "哥布林",
    "Gnome": "侏儒",
    "Cath": "猫族",
    "Wolven": "狼人",
    "Centaur": "人马",
    "Balorg": "炎魔",
    "Imp": "小恶魔",
    "Seraph": "大天使",
    "Unicorn": "独角兽",
    "Arraak": "陆行鸟",
    "Pterodacti": "翼手龙",
    "Dracnid": "天龙",
    "Tortoisan": "乌龟人",
    "Gecko": "壁虎",
    "Slitheryn": "娜迦",
    "Sharkin": "鲨鱼人",
    "Octigoran": "八爪鱼",
    "Ent": "树人",
    "Cacti": "仙人掌",
    "Pinguicula": "捕虫堇",
    "Sporgar": "孢子虫",
    "Shroomi": "蘑菇人",
    "Moldling": "霉菌人",
    "Valdi": "瓦尔迪",
    "Dryad": "树妖",
    "Satyr": "萨提尔",
    "Phoenix": "不死鸟",
    "Salamander": "火蜥蜴",
    "Yeti": "雪怪",
    "Wendigo": "温迪戈",
    "Tuskin": "獠牙人",
    "Kamel": "骆驼人",
    "Custom": "自建种族",

    // 宇宙
    "Standard": "标准宇宙",
    "Heavy": "高引力宇宙",
    "Antimatter": "反物质宇宙",
    "Evil": "邪恶宇宙",
    "Micro": "微型宇宙",
    "Magic": "魔法宇宙",

    // 星球
    "Most habitable": "最宜居",
    "Most achievements": "最多成就",
    "Highest weighting": "最高权重",

    // 地区
    "Alien 1 System": "第四星系",
    "Alien 2 System": "第五星系",

    // 资源
    "Orichalcum": "奥利哈刚",
    "Vitreloy": "金属玻璃",
    "Bolognium": "钋",
    "Nano Tube": "纳米管",
    "Stanene": "超导体",
    "Graphene": "石墨烯",
    "Adamantite": "精金",
    "Helium-3": "氦-3",
    "Iridium": "铱",
    "Polymer": "聚合物",
    "Alloy": "合金",
    "Titanium": "钛",
    "Steel": "钢",
    "Uranium": "铀",
    "Oil": "石油",
    "Coal": "煤",
    "Cement": "水泥",
    "Aluminium": "铝",
    "Iron": "铁",
    "Copper": "铜",
    "Furs": "皮毛",
    "Crystal": "水晶",
    "Stone": "石头/琥珀",
    "Lumber": "木头",
    "Chrysotile": "温石棉",
    "Food": "食物",
    "Deuterium": "氘",
    "Neutronium": "中子",
    "Infernite": "地狱石",
    "Elerium": "超铀",
    "Plywood": "胶合板",
    "Brick": "砌砖",
    "Wrought Iron": "锻铁",
    "Sheet Metal": "金属板",
    "Mythril": "秘银",
    "Aerogel": "气凝胶",
    "Nanoweave": "纳米织物",
    "Scarletite": "绯绯色金",

    // title
    "Alien Gift increases piracy, you can disable auto research of it if you want to postpone that": null,
    "Turns attacks off and on": null,
    "Perform unification once all three powers are subdued. autoResearch should be enabled for this to work.": null,
    "Occupy last foreign power once other two are subdued, and unification is researched. It will speed up unification. And even if you don't want to unify at all - disabled above checkbox, and just want to plunder enemies, this option still better to keep enabled. As a side effect it will prevent you from wasting money influencing and inciting last foreign power, and allow you to occupy it during looting with sieges, for additional production bonus. Disable it only if you want annex\purchase achievements.": null,
    "Maximum spies per foreign power": null,
    "Switches to attack next foreign power once its power lowered down to this number. When exact numbers not know script tries to approximate it. `weak` power will be recognized as ≤75, and such. Thus, it's not recomended to set it down to 50, unless you'll increase amount of spies, to ensure you'll still see that exact value even when one of your spies is captured on mission.": null,
    "Perform this against inferior foreign power, with military power equal or below given threshold. Complex actions includes required preparation - Annex and Purchase will incite and influence, Occupy will sabotage, until said options will be available.": null,
    "Perform this against superior foreign power, with military power above given threshold. Complex actions includes required preparation - Annex and Purchase will incite and influence, Occupy will sabotage, until said options will be available.": null,
    "Perform sabotage against current target if it's useful(power above 50), regardless of required power, and default action defined above": null,
    "Hire a mercenary if remaining money will be greater than this percent": null,
    "Minimum advantage to launch campaign, ignored during ambushes": null,
    "Once campaign is selected, your battalion will be limited in size down this advantage, reducing potential loses": null,
    "Maximum battalion for siege campaign. Only try to siege if it's possible with up to given amount of soldiers. Siege is expensive, if you'll be doing it with too big battalion it might be less profitable than other combat campaigns. This option not applied for unification, it's only for regular looting.": null,
    "Adjusts ships distribution to fully supress piracy in prioritized regions. Some potential defence will be wasted, as it will use big ships to cover small holes, when it doesn't have anything fitting better. This option is *not* required: all your dreadnoughts still will be used even without this option.": null,
    "Automatically adjust galaxy trade routes": null,
    "Wait until storage is empty before reassigning containers to another resource, to prevent overflowing and wasting resources": null,
    "Resources already produced above maximum amount required for constructing buildings won't be crafted, if there's better options enabled and available, ignoring weighted ratio": null,
    "Cast rituals only with full mana": null,
    "Automatically sets the default job in order of Quarry Worker -> Lumberjack -> Scavenger -> Farmer": null,
    "Ignore weighting and immediately construct building if it uses any capped resource, preventing wasting them by overflowing. Weight still need to be positive(above zero) for this to happen.": null,
    "A.R.P.A. projects that require crafted resources won't override and build if resources are below this amount, -1 stands for maximum amount required by other buildings.": null,


/*
    // 建筑物
    // 郊外
    "Slave Market": "奴隶市场",
    "Sacrificial Altar": "祭坛",

    // 住宅区
    "Cabin": "小木屋",
    "Cottage": "茅屋",
    "Apartment": "公寓",
    "Farm": "农场",
    "Compost Heap": "堆肥箱",
    "Lodge": "小屋",

    // 商业区
    "Slave Pen": "奴隶围栏",
    "Bank": "银行",
    "Tourist Center": "旅游中心",
    "Amphitheatre": "圆形剧场",
    "Casino": "赌场",
    "Temple": "寺庙",
    "Shrine": "神社",

    // 科学部门
    "University": "大学",
    "Library": "图书馆",
    "Wardenclyffe": "沃登克里弗塔",
    "Bioscience Lab": "生命科学实验室",

    // 军事设施
    "Barracks": "军营",
    "Hospital": "医院",
    "Boot Camp": "新兵训练营",

    // 贸易区
    "Grain Silo": "粮仓",
    "Smokehouse": "烟房",
    "Soul Well": "灵魂井",
    "Shed": "窝棚",
    "Freight Yard": "货场",
    "Container Port": "集装箱港口",
    "Fuel Depot": "燃料库",
    "Trade Post": "贸易站",
    "Wharf": "码头",

    // 工业区
    "Pylon": "水晶塔",
    "Graveyard": "墓地",
    "Lumber Yard": "伐木场",
    "Sawmill": "锯木厂",
    "Rock Quarry": "采石场",
    "Cement Factory": "水泥厂",
    "Foundry": "铸造厂",
    "Factory": "工厂",
    "Smelter": "冶炼厂",
    "Metal Refinery": "金属精炼厂",
    "Mine": "矿井",
    "Coal Mine": "煤矿",
    "Oil Derrick": "石油井架",

    // 公共事业部门
    "Mill (Good Windmill)": "磨坊（非邪恶种族的风车）",
    "Windmill (Evil only)": "风车（邪恶种族）",
    "Coal Powerplant": "煤电厂",
    "Oil Powerplant": "石油发电厂",
    "Fission Reactor": "裂变反应堆",
    "Mass Driver": "质量驱动器",

    // 家园行星
    "Test Launch": "试射",
    "Space Satellite": "人造卫星",
    "Space Gps": "GPS卫星",
    "Space Propellant Depot": "推进剂库",
    "Space Navigation Beacon": "导航灯塔",

    // 月球
    "Moon Mission": "月球任务",
    "Moon Base": "月球基地",
    "Moon Iridium Mine": "铱矿",
    "Moon Helium-3 Mine": "氦-3矿",
    "Moon Observatory": "月球观测站",

    // 红色行星
    "Red Mission": "红色行星任务",
    "Red Spaceport": "太空港",
    "Red Space Control": "航天控制",
    "Red Living Quarters": "生活区",
    "Red VR Center": "VR中心",
    "Red Garage": "格纳库",
    "Red Mine": "红色行星矿井",
    "Red Fabrication": "红色行星铸造厂",
    "Red Factory": "红色行星工厂",
    "Red Biodome": "生物穹顶",
    "Red Exotic Materials Lab": "外星材料实验室",
    "Red Ziggurat": "通灵塔",
    "Red Marine Barracks": "太空驻军",

    // 地狱行星
    "Hell Mission": "地狱行星任务",
    "Hell Geothermal Plant": "地热发电厂",
    "Hell Space Casino": "太空赌场",
    "Hell Swarm Plant": "蜂群工厂",

    // 太阳
    "Sun Mission": "太阳任务",
    "Sun Control Station": "蜂群卫星控制站",
    "Sun Swarm Satellite": "蜂群卫星",

    // 气态巨星
    "Gas Mission": "气态巨星任务",
    "Gas Helium-3 Collector": "氦-3收集器",
    "Gas Fuel Depot": "星系燃料库",
    "Gas Space Dock": "星际船坞",
    "Gas Space Probe": "太空探测器",
    "Gas Bioseeder Ship Segment": "生物播种船",

    // 气体巨行星
    "Gas Moon Mission": "气态巨星卫星任务",
    "Gas Moon Mining Outpost": "采矿前哨",
    "Gas Moon Mining Drone": "采矿无人机",
    "Gas Moon Oil Extractor": "石油提取器",


    // 小行星带
    "Belt Mission": "小行星带任务",
    "Belt Space Station": "深空采矿站",
    "Belt Elerium Mining Ship": "超铀采矿船",
    "Belt Iridium Mining Ship": "铱采矿船",
    "Belt Iron Mining Ship": "铁采矿船",

    // 矮行星
    "Dwarf Mission": "矮行星任务",
    "Dwarf Elerium Storage": "超铀存储",
    "Dwarf Elerium Reactor": "超铀反应堆",
    "Dwarf World Collider": "世界超级对撞机",
    "Dwarf WSC Control": "世界超级对撞机控制器",

    // 半人马座α星系
    "Alpha Centauri Mission": "半人马座α星系任务",
    "Alpha Starport": "星际港口",
    "Alpha Habitat": "定居点",
    "Alpha Mining Droid": "采矿机器人",
    "Alpha Processing": "精金加工设施",
    "Alpha Fusion": "聚变反应堆",
    "Alpha Laboratory": "深空实验室",
    "Alpha Exchange": "星际交易所",
    "Alpha Factory": "石墨烯厂",
    "Alpha Warehouse": "半人马座α星系仓库",
    "Alpha Mega Factory": "大型工厂",
    "Alpha Luxury Condo": "豪华公寓",
    "Alpha Exotic Zoo": "异族动物园",

    // 比邻星
    "Proxima Mission": "比邻星任务",
    "Proxima Transfer Station": "星际转运站",
    "Proxima Cargo Yard": "星际货仓",
    "Proxima Cruiser": "巡逻艇",
    "Proxima Dyson": "戴森网",
    "Proxima Dyson Sphere": "戴森球",
    "Proxima Orichalcum Sphere": "奥利哈刚戴森球",

    // 螺旋星云
    "Nebula Mission": "螺旋星云任务",
    "Nebula Nexus": "星际枢纽站",
    "Nebula Harvester": "气体收集器",
    "Nebula Elerium Prospector": "超铀开采器",

    // 中子星
    "Neutron Mission": "中子星任务",
    "Neutron Miner": "中子矿船",
    "Neutron Citadel Station": "AI中枢要塞",
    "Neutron Stellar Forge": "恒星熔炉",

    // 黑洞
    "Blackhole Mission": "黑洞任务",
    "Blackhole Far Reach": "遥远星际",
    "Blackhole Stellar Engine": "恒星引擎",
    "Blackhole Mass Ejector": "质量喷射器",
    "Blackhole Jump Ship": "跃迁飞船",
    "Blackhole Wormhole Mission": "虫洞任务",
    "Blackhole Stargate": "星际之门",
    "Blackhole Completed Stargate": "完成建造的星际之门",

    // 天狼星
    "Sirius Mission": "天狼星",
    "Sirius B Analysis": "天狼星B研究计划",
    "Sirius Space Elevator": "轨道电梯",
    "Sirius Gravity Dome": "重力穹顶",
    "Sirius Ascension Machine": "飞升装置",
    "Sirius Ascension Trigger": "开始飞升",
    "Sirius ThermalCollector": "集热器",

    // 仙女座

    // 堡垒
    "Portal Laser Turret": "激光炮塔",
    "Portal Surveyor Carport": "勘探车",
    "Portal War Droid": "战斗机器人",
    "Portal Repair Droid": "维修机器人",

    // 废土
    "Portal Predator Drone": "掠食者无人机",
    "Portal Sensor Drone": "探测无人机",
    "Portal Attractor Beacon": "吸引器信标",

    // 陨石坑
    "Portal Pit Mission": "探索陨石坑",
    "Portal Soul Forge": "防卫陨石坑",
    "Portal Soul Attractor": "灵魂锻炉",
    "Portal Gun Emplacement": "自动炮台",
    "Portal AssaultForge": "灵魂引渡器",

    // 遗迹
    "Portal East Tower": "东侧巨塔",
    "Portal West Tower": "西侧巨塔",

    // 未知建筑（请补充归类一下）
    "Portal Inferno Reactor": null,
    "Portal Arcology": null,
    "Alpha Processing Facility": null,
    "Alpha Graphene Plant": null,
    "Moon Launch": null,
    "Sirius Thermal Collector": null,
    "Gateway Mission": null,
    "Gateway Starbase": null,
    "Gateway Ship Dock": null,
    "Stargate Station": null,
    "Stargate Telemetry Beacon": null,
    "Gateway Dreadnought": null,
    "Gateway Cruiser Ship": null,
    "Gateway Frigate Ship": null,
    "Gateway Bolognium Ship": null,
    "Gateway Corvette Ship": null,
    "Gateway Scout Ship": null,
    "Gorddon Mission": null,
    "Gorddon Embassy": null,
    "Gorddon Dormitory": null,
    "Gorddon Symposium": null,
    "Gorddon Freighter": null,
    "Alien 1 Consulate": null,
    "Alien 1 Resort": null,
    "Alien 1 Vitreloy Plant": null,
    "Alien 1 Super Freighter": null,
    "Alien 2 Foothold": null,
    "Alien 2 Scavenger": null,
    "Alien 2 Armed Miner": null,
    "Alien 2 Ore Processor": null,
    "Chthonian Mine Layer": null,
    "Chthonian Excavator": null,
    "Chthonian Raider": null,
    "Blackhole Farpoint": null,
    "Cement Plant": null,
    "Stargate Defense Platform": null,
    "Stargate Depot": null,
    "Portal Ancient Pillars": null,
    "Portal Survey Ruins": null,
    "Portal Guard Post": null,
    "Portal Vault": null,
    "Portal Archaeology": null,
    "Portal Infernal Forge": null,
    "Portal Gate Turret": null,
    "Portal Infernite Mine": null,
*/

    // 杂项
    "Enable ejecting of this resource. When to eject is set in the Prestige Settings tab.": "允许喷射此项资源。进行喷射的时机在威望重置设置下。",
    "Enable buying of this resource. When to buy is set in the Settings tab.": "允许购买此项资源。进行购买的时机在市场设置下。",
    "Enable selling of this resource. When to sell is set in the Settings tab.": "允许出售此项资源。进行出售的时机在市场设置下。",
    "Enable trading for this resource. Max routes is set in the Settings tab.": "允许使用贸易路线购买此项资源。贸易路线的上限在市场设置下。",
    "Enable trading this resource away. Min income is set in the Settings tab.": "允许使用贸易路线出售此项资源。最低的资金收入在市场设置下。",
};

(function() {

    console.log("TMVictor（新）汉化开始");

    sidebarListener();
    settingsListener();
})();

/**
 * 侧边栏监听
 */
function sidebarListener() {

    setInterval(function() {

        // 获取侧边栏
        var container = $("#autoScriptContainer");
        // 获取脚本弹窗
        var scriptModal = $("#scriptModal");

        // 获取到侧边栏才进行汉化
        if(container.length === 1) {

            // 汉化侧边栏
            textCH(container);

            // 汉化侧边栏的威望重置弹窗
            textCH(scriptModal);
        }

    }, LISTENER_TIME);
}

/**
 * 设置选项卡监听
 */
function settingsListener() {

    setInterval(function() {

        // 获取脚本设置选项
        var settings = $("#script_settings");

        // 获取到脚本设置选项才进行汉化
        if(settings.length === 1) {

            // 汉化脚本设置
            textCH(settings);
            
            //建筑名单独汉化
            buildingNameTextCH();
            
            //建立建筑名英汉对照框
            triggerBuildingNameTextCH();
        }
    }, LISTENER_TIME);
}

/**
 * 文本汉化
 *
 * @param target 目标元素
 */
function textCH(target) {

    // 获取目标元素中所有的子元素
    var settingsElems = $(target).find("*");

    // 遍历子元素，汉化其中的title属性和文本内容
    settingsElems.each(function(index, e) {

        // 标签汉化
        var title = $(e).attr('title');
        if (title) {

            var titleCH = CNZ_MAP[title];
            titleCH ? $(e).attr('title', titleCH) : null;
        }

        // 首个子节点汉化
        var firstChild = $(e).prop('firstChild');
        if (firstChild) {

            firstChild = firstChild.nodeValue;
            var firstChildCH = CNZ_MAP[firstChild];
            if (firstChildCH) {
                var obj = $(e).text(firstChildCH);
                // 替换占位字符串\n为换行标签（&lt;br&gt;=<br>）
                obj.html(obj.html().replace(/\n/g,'<br/>'));
            }
        }

        // 末尾子节点汉化
        var lastChild = $(e).prop('lastChild');
        if (lastChild) {

            lastChild = lastChild.nodeValue;
            var lastChildCH = CNZ_MAP[lastChild];
            if (lastChildCH) {
                obj = $(e).text(lastChildCH);
                // 替换为换行标签
                obj.html(obj.html().replace(/\n/g,'<br/>'));
            }
        }
    });
}

/**
 * 特殊文本汉化
 */
function specialTextCH() {

    $("#s-quick-prestige-options").contents().filter(function(){
        return this.nodeType == 3;
    })[0].nodeValue = '威望重置选项';
}


var buildingCNNameObj = {};
//建筑名汉化
function buildingNameTextCH()
{
    var buildingList = document.getElementById("script_buildingTableBody").childNodes;

    //防止重复汉化
    //if(document.querySelector("#script_portal-infernite_mineToggle > span").innerText == "地狱石矿井") return;

    for(var i = 1; i < buildingList.length; i++)
    {
        tempA = buildingList[i].getAttribute("value");
        tempL = tempA.indexOf('-')
        tempB1 = tempA.substr(0,tempL)
        tempB2 = tempA.substr(tempL+1)
        var tempTitle
        var tempTitleStr
        if(typeof(evolve.actions[tempB1][tempB2])  == "undefined")
        {
            var tempSubObList = Object.keys(evolve.actions[tempB1]);
            for(var j = 0; j < tempSubObList.length; j++)
            {
                if(!(typeof(evolve.actions[tempB1][tempSubObList[j]][tempB2])  == "undefined"))
                {
                    tempTitle = evolve.actions[tempB1][tempSubObList[j]][tempB2].title;
                    break;
                }
            }
        }
        else
        {
            tempTitle = evolve.actions[tempB1][tempB2].title
        }

        if(typeof(tempTitle) == "function")
            tempTitleStr = tempTitle()
        else
            tempTitleStr = tempTitle

        //保存建筑名对照表
        if(typeof(buildingCNNameObj[tempTitleStr]) == "undefined")
           buildingCNNameObj[tempTitleStr] = buildingList[i].getElementsByTagName("span")[0].innerText

        //赋值
        buildingList[i].getElementsByTagName("span")[0].innerText = tempTitleStr

        delete tempTitle
        delete tempTitleStr
    }

}

function triggerBuildingNameTextCH()
{
    if(document.querySelector("#buildingCNTextField") != null)
        return;
    var buildingCNTextField = document.createElement("div")
    buildingCNTextField.setAttribute("id", "buildingCNTextField")
    buildingCNTextField.setAttribute("style", "margin-top: 10px; margin-bottom: 10px;")
    buildingCNTextField.innerHTML =
        '<a style="width:16%">中文名</a>'+
        '<a style="width:18%"><input id="buildingCNTextName"></a>'+
        '<a style="width:11%"></a>'+
        '<a style="width:16%">英文名</a>'+
        '<a style="width:18%"><input id="buildingENTextName"></a>'+
        '<a style="width:21%"></a>'

    document.querySelector("#script_triggerContent").insertBefore(buildingCNTextField,document.querySelector("#script_triggerContent").firstChild)
    //中文名列表
    $('#buildingCNTextName').on('click', function () {
        if(!($('#buildingCNTextName').hasClass("ui-autocomplete-input")))
        {
            $('#buildingCNTextName').autocomplete({
                source: Object.keys(buildingCNNameObj),
                delay: 0,
                select: function (event, ui) {
                    console.log(ui)
                    console.log(ui.item.value)
                    console.log(buildingCNNameObj[ui.item.value])
                    $('#buildingENTextName').val(buildingCNNameObj[ui.item.value])
                }
            });
        }
    });
}

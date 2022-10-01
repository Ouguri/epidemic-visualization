export interface ShowAddSwitch {
	nowConfirm: boolean;
	importedCase: boolean;
	localinfeciton: boolean;
	nowSevere: boolean;
	noInfect: boolean;
	localConfirm: boolean;
	all: boolean;
	confirm: boolean;
	suspect: boolean;
	dead: boolean;
	heal: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	wzz: number;
	mediumRiskAreaNum: number;
	mtime: string;
	nowConfirm: number;
	confirm: number;
	dead: number;
	showRate: boolean;
	highRiskAreaNum: number;
	adcode: string;
	provinceLocalConfirm: number;
	heal: number;
	showHeal: boolean;
	continueDayZeroLocalConfirmAdd: number;
	continueDayZeroLocalConfirm: number;
}

export interface Total {
	dead: number;
	heal: number;
	showHeal: boolean;
	wzz: number;
	adcode: string;
	showRate: boolean;
	highRiskAreaNum: number;
	continueDayZeroConfirmAdd: number;
	continueDayZeroLocalConfirmAdd: number;
	confirm: number;
	provinceLocalConfirm: number;
	mediumRiskAreaNum: number;
	mtime: string;
	nowConfirm: number;
	continueDayZeroConfirm: number;
}

export interface Total {
	mtime: string;
	dead: number;
	continueDayZeroLocalConfirm: number;
	showHeal: boolean;
	mediumRiskAreaNum: number;
	nowConfirm: number;
	confirm: number;
	continueDayZeroLocalConfirmAdd: number;
	adcode: string;
	showRate: boolean;
	wzz: number;
	highRiskAreaNum: number;
	heal: number;
	provinceLocalConfirm: number;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	wzz_add: string;
	local_confirm_add: number;
}

export interface Children {
	total: Total;
	name: string;
	adcode: string;
	date: string;
	today: Today;
}

export interface Today {
	abroad_confirm_add: number;
	dead_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: string;
	local_confirm_add: number;
}

export interface Children {
	total: Total;
	children: Children[];
	name: string;
	adcode: string;
	date: string;
	today: Today;
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface ChinaTotal {
	confirm: number;
	suspect: number;
	showLocalConfirm: number;
	deadAdd: number;
	mtime: string;
	localConfirmAdd: number;
	highRiskAreaNum: number;
	heal: number;
	nowSevere: number;
	importedCase: number;
	localConfirmH5: number;
	nowLocalWzz: number;
	localConfirm: number;
	dead: number;
	noInfect: number;
	noInfectH5: number;
	local_acc_confirm: number;
	nowConfirm: number;
	mRiskTime: string;
	showlocalinfeciton: number;
	localWzzAdd: number;
	confirmAdd: number;
	mediumRiskAreaNum: number;
}

export interface ChinaAdd {
	confirm: number;
	nowConfirm: number;
	noInfect: number;
	noInfectH5: number;
	localConfirm: number;
	localConfirmH5: number;
	heal: number;
	dead: number;
	suspect: number;
	nowSevere: number;
	importedCase: number;
}

export interface Diseaseh5Shelf {
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
}

export interface LocalCityNCOVDataList {
	province: string;
	adcode: string;
	isUpdated: boolean;
	local_confirm_add: number;
	highRiskAreaNum: number;
	isSpecialCity: boolean;
	city: string;
	date: string;
	mtime: string;
	local_wzz_add: string;
	mediumRiskAreaNum: number;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	localCityNCOVDataList: LocalCityNCOVDataList[];
}
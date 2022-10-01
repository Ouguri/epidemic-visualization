import { getApiList } from '@/server'
import { defineStore } from 'pinia'
import type { Children, ChinaTotal, ChinaAdd, RootObject, LocalCityNCOVDataList } from './type'

export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    list: <RootObject>{},
    item: <Children[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal:<ChinaTotal>{},
    cityDetail: <LocalCityNCOVDataList[]>[]
  }),
  actions: {
    async getList() {
      const result = await getApiList()
      this.list = result
      this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd
      this.chinaTotal = this.list.diseaseh5Shelf.chinaTotal
      this.cityDetail = this.list.localCityNCOVDataList.slice(0, 10)
    }
  }
})

import type { Ref } from 'vue'
import { inject } from 'vue'

import type { HomeSubPage } from '~/contentScripts/views/Home/types'
import type { AppPage } from '~/enums/appEnums'

// 定义撤销/前进按钮的状态枚举
export enum UndoForwardState {
  Hidden = 'hidden', // 隐藏状态
  ShowUndo = 'showUndo', // 显示撤销按钮
  ShowForward = 'showForward', // 显示前进按钮
}

export interface BewlyAppProvider {
  activatedPage: Ref<AppPage>
  // 添加Home页面的子页面状态
  homeActivatedPage: Ref<HomeSubPage>
  scrollbarRef: Ref<any>
  reachTop: Ref<boolean>
  mainAppRef: Ref<HTMLElement>
  handleReachBottom: Ref<(() => void) | undefined>
  handlePageRefresh: Ref<(() => void) | undefined>
  // 添加撤销刷新的处理函数
  handleUndoRefresh: Ref<(() => void) | undefined>
  handleForwardRefresh: Ref<(() => void) | undefined>
  // 使用枚举状态统一管理撤销/前进按钮
  undoForwardState: Ref<UndoForwardState>
  handleBackToTop: (targetScrollTop?: number) => void
  haveScrollbar: () => Promise<boolean>
  openIframeDrawer: (url: string) => void
}

export function useBewlyApp(): BewlyAppProvider {
  const provider = inject<BewlyAppProvider>('BEWLY_APP')

  if (import.meta.env.DEV && !provider)
    throw new Error('AppProvider is not injected')

  return provider!
}

import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree'
import { useStaticRendering } from "mobx-react";
const isServer = typeof window === "undefined";
// Comment 1
useStaticRendering(isServer);
let store: IStore = null as any;

const Store = types
  .model({
    foo: types.number,
    lastUpdate: types.Date,
    light: false,
    count: types.number
  })
  .actions(self => {
    let timer;
    const start = () => {
      timer = setInterval(() => {
        // mobx-state-tree doesn't allow anonymous callbacks changing data.
        // Pass off to another action instead (need to cast self as any
        // because typescript doesn't yet know about the actions we're
        // adding to self here)
        (self as any).update();
      }, 1000);
    };
    const update = () => {
      self.lastUpdate = new Date(Date.now());
      self.light = true;
    };
    const stop = () => {
      clearInterval(timer);
    };
    const add = () => {
      self.count += 1;
    };
    return { start, stop, update, add };
  });

export type IStore = Instance<typeof Store>;
export type IStoreSnapshotIn = SnapshotIn<typeof Store>;
export type IStoreSnapshotOut = SnapshotOut<typeof Store>;

// initializeStore 方法，服务端渲染时，每个独立的请求都将创建一个新的store，
// 以此来隔离请求之间的状态混淆，当客户端渲染时，只需要引用之前已经创建过的store即可，
// 因为同一个应用程序（SPA）应该共享一颗状态树
// 以上即MobX状态管理的主逻辑实现，接下来将讲述MobX如何配合Next.js和react实现状态管理

export const initializeStore = (isServer, snapshot = null) => {
  if (isServer) {
    store = Store.create({
      foo: 6,
      lastUpdate: Date.now(),
      light: false,
      count:10
    });
  }
  if ((store as any) === null) {
    store = Store.create({
      foo: 6,
      lastUpdate: Date.now(),
      light: false,
      count: 10
    });
  }
  if (snapshot) {
    applySnapshot(store, snapshot);
  }
  return store;
}

import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    // Подключаем редюсер для счетчика
    filter,
  },
});

console.log(store.getState());
// Экспортируем типы RootState и AppDispatch для использования в других частях приложения
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

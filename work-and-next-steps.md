# Việc đã làm và Kế hoạch tiếp theo

## Việc đã làm

- Lập kế hoạch và kiểm tra các store và trang hiện tại.
- Thêm composable `useApi` để đóng gói `useFetch` và `useRuntimeConfig` ([composables/useApi.ts](composables/useApi.ts#L1)).
- Cài đặt `courseService` sử dụng `useApi` ([services/course.service.ts](services/course.service.ts#L1)).
- Thêm Pinia store cho Course: `useCourseStore` ([stores/course.ts](stores/course.ts#L1)).
- Thêm Pinia store cho User: `useUserStore` ([stores/user.ts](stores/user.ts#L1)).
- Cập nhật trang danh sách khoá học `pages/course/index.vue` để sử dụng store và thêm trang tìm kiếm `pages/search/index.vue` dùng `useAsyncData`.

## Kế hoạch tiếp theo

1. Lấy (hoặc chép) source gốc từ `~/Documents/work-spaces/easy-english-fe` vào workspace hiện tại để hoàn thiện logic và types chính xác.
2. Map đầy đủ các endpoint API và cập nhật `runtime config` (`nuxt.config.ts` / `publicRuntimeConfig`) nếu cần.
3. Chạy thử ứng dụng cục bộ và kiểm tra hoạt động của store và trang:

```bash
# cài dependencies nếu cần
npm install
# hoặc pnpm install / yarn

# chạy dev server
npm run dev
```

4. Viết test/tín hiệu kiểm thử cơ bản cho stores (tuỳ chọn).
5. Ghi chép thay đổi, commit và hướng dẫn deploy ngắn vào README hoặc changelog.

---

Nếu bạn muốn, tôi sẽ tiếp tục: (A) copy các file từ đường dẫn nguồn trên, hoặc (B) chạy dev server để kiểm thử. Chọn A hoặc B.

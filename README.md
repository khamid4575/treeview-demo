# Treeview Demo

Bu loyiha Vite, Tailwind CSS, va React Router Dom asosida yaratilgan. Treeview – bu daraxt shaklidagi ma'lumotlarni vizual tarzda ko'rsatish uchun ishlatiladigan komponent.

## Texnologiyalar

Loyihada quyidagi texnologiyalar ishlatilgan:

- **Vite**: Tez ishlovchi va qulay frontend bundler.
- **React**: UI yaratish uchun mashhur kutubxona.
- **Tailwind CSS**: Tez va oson usulda responsiv, zamonaviy dizaynlar yaratish uchun CSS framework.
- **React Router Dom**: Routelarni boshqarish va sahifalar orasida qulay navigatsiya qilish imkonini beruvchi kutubxona.

## Funktsiyalar

- Daraxt ko'rinishida ma'lumotlar strukturasini ko'rsatish.
- Har bir nodeni kengaytirish yoki qisqartirish imkoniyati.
- Nodelarni tanlash va natijasini qaytarish (checkbox orqali).
- Node tanlanganda uning barcha bolalarini avtomatik tanlash (yoki bekor qilish).

## Qanday ishlaydi?

1. Dastlab daraxtdagi barcha bolalar yashirin holda bo'ladi. Foydalanuvchi arrow buttonlarning birni bosganida, nodening bolalari ko'rsatiladi yoki yashiriladi.
2. Checkbox tanlanganida, tanlangan nodening `id` qiymati qaytadi.
3. Query param orqali tanlangan va ochilgan nodelarni saqlab, qayta yuklanganda saqlangan state ini tiklash mumkin.

## Ishga tushirish

1. git clone.
2. Barcha kerakli modullarni o'rnating:

   ```bash
   npm install
   ```

3. Loyiha serverini ishga tushiring:

   ```bash
   npm run dev
   ```

4. Brauzerda [http://localhost:5173](http://localhost:5173) ni kiring va Treeview demoni ko'ring.

## Testlar

Loyihada `vitest` va `@testing-library/react` orqali yozilgan testlar mavjud. Testlarni ishga tushirish uchun:

```bash
npm install vitest @testing-library/react @testing-library/jest-dom jsdom
```

```bash
npm test
```


version 2.0

test uchun mock store dan foydalanamiz

```bash
npm i --save-dev @types/redux-mock-store
```
bu versiyada redux toolkit dan foydalanamiz. Statelarni saqlash uchun

```bash
npm install @reduxjs/toolkit
```
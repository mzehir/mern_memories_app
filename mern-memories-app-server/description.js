//! 1- CRUD nedir?
//? Crud create, read, update ve delete kelimelerinin kısaltılmış halidir.

//! 2- Backend'e yapılan istek tipleri nelerdir?
//TODO A- Get İsteği
//? Mesela veritabanından tüm anıları çekmek için backendde get isteği göndeririz.

//TODO B- Post İsteği
//? Mesela veritabanına yeni bir yeni bir anı kaydetmek için backendde anıyla alakalı datamız ile beraber post isteği göndeririz.

//TODO C- Delete İsteği
//? Mesela veritabanından bir anıyı silmek için backendde, silmek istediğimiz anı id'si ile birlikte delete isteği göndeririz.

//TODO D- Put İsteği
//? Mesela veritabanında var olan bir anıyı değiştirmek, bilgilerini güncellemek için backendde güncellemek istediğimiz anının id'si ile birlikte put isteği gönderiririz.

//! 3- Backend Node.js(express.js) Projesi Nasıl Oluşturulur. Olmassa Olmaz Paketler :)
//TODO A- package.json Dosyasının Oluşturulması
//? Bir backend projesi oluşturmak için öncelikle package.json dosyası oluşturulmalıdır. Bu dosya uygulamamız ile alakalı bilgileri içerir. Bir nevi uygulamamızın kimliği diyebiliriz.
//? Bu dosyayı oluşturmak için editörümüzün console'sine 'npm init' komutu yazılmalıdır ve çalıştırılmalıdır.

//? Backend projesinde modern import syntax'ı kullanabilmek için main değerinin bir alt satırına "'type':'module'" değeri eklenmelidir. Böylelikle sayfa importlarında 'require' yapısını kullanmamıza gerek kalmaz.

//? Proje dosyalarını oluşturduktan sonra projeyi herhangi bir porta bağlayabilmek yani ayağa kaldırabilmek için package.json dosyasının script objesine "'start':'node index.js'" komutu eklenmelidir.
//? Daha sonra editörün console'sine 'npm start' yazdığımızda proje ayağa kalkacaktır.

// TODO B- index.js Dosyasının Oluşturulması
//? Bir backend projesi için ikinci adımda bu dosya oluşturulmalıdır. Bu bizim projemizin ana dosyasıdır. Bu dosya package.json dosyasındaki main objesinin value'si ile ve script objesindeki
//? start key'inin value'si ile eşleşmelidir.

// TODO C- Express.js'in Projeye Eklenmesi
//? Express.js node.js üzerine oluşturulmuş bir web uygulaması çerçevesidir. Yani sunucu taraflı uygulamalarda sunucu ve sunucuya giden yollar arasındaki veri akışının kolay yönetilmesine yardımcı olur.
//? Bu modül MVC(Model-View-Controller) mimarisini takip eder.
//? MongoDB, Redis, MySQL gibi veritabanları ile entegrasyon yapar.
//? Uygulama içi özelleştirmeyi kolaylaştırır.

//? Bu modülü yüklemek için editörün console'sine "npm install express" yazılmalıdır ve çalıştırılmalıdır.
//? Bu modülü kullanabilmek için ana index.js dosyamıza "const app = express();" yazılmalıdır.
//? app.listen(process.env.PORT, () => {
//?   console.log(`${process.env.PORT}. portta dinliyor...`); =====> Ve sonrasında bunun gibi kullanılmaldır.
//? });

// TODO D- cors Modülünün Projeye Dahil Edilmesi
//cors,

// TODO E- dotenv Modülünün Projeye Dahil Edilmesi
//? Bu modül sayesinde ortam değişkenlerini gizli tutabiliriz. Mesela db'ye baplanmak için gereken connectionStrink bilgilei gibi. Kısacası hassas bilgilerin saklandığı dosya diyebiliriz.

//? Hassas bilgileri saklamak için '.env' dosyası oluşturulmalıdır. Ve içerisine yazılacak bilgi 'PORT = 5000' gibi bir syntax formatında yazılmalıdır.
//? Bu port bilgisini herhangi bir dosyada kullanabilmek için ise öncelikle dosyaya "import dotenv from 'dotenv'" importu yapılmalıdır. Daha sonra "dotenv.config()" çağrımı yapılmalıdır.
//? Daha sonra mesela app.listen(process.env.PORT,() =>{...}) gibi kullanılmalıdır.

// TODO F- VeriTabanının(Mongo Atlas) Modülünün Projeye Dahil Edilmesi(Mongoose ile)
//? Mongoose ile mongo veritabanına kolaylıkla bağlantı yapabiliriz. Yani bu paket MongoDB ile iletişim kurmamızı sağlar.
//? Bunu projeye dahil edebilmek için editörün console'sine "npm i mongoose" komutu yazıp çalıştırılmalıdır.

//? Aynı zamanda oluşturduğumuz MongoAtlas Veritabanını projemize ekleme için veritabanının sunduğu connectionStrink bilgisini '.env' dosyasına kaydetmeliyiz.
//? Bu kayıt "MONGO_URI = mongodb+srv://Admin:123@anikutusu.5l8ko.mongodb.net/AniKutusu?retryWrites=true&w=majority" syntax'ında olmalıdır.
//? Yukarıdaki "123" kısmı bizim mongo veritabanı şifremiz olmalıdır. "AniKutusu" ise bizim veritabanımızın ismidir.

//? Bunu projeye dahil etmek için ana index.js dosyamıza "import mongoose from "mongoose";" importunu yapmalıyız.
//? app.listen(process.env.PORT, () => {
//?   mongoose                                   =====> Daha sonra ana index.js dosyamızdaki port dinleme kısmına mongo connectionString'ini mongoose ile eklememiz gerekir
//?     .connect(process.env.MONGO_URI, {
//?     })
//?     .then(() => console.log("Database bağlantısı başarılı..."))
//?     .catch((err) => console.log(err, "Database'ye bağlantı yapılamadı..."));
//? });

// TODO G- Nodemon'un Dahil Edilmesi
//? Bu paketi kurmak için editörün console'sine 'npm i -D nodemon' yazıp. Komutu çalıştırmalıyız. "-D" yazmak ise bu paketi sadece geliştirme aşamasında kullanacağız anlamına gelir.
//? Bu paket ile birlikte kod üzerinde herhangi bir değişiklik yapıldığında server'imizi yeniden başlatmaya gerek kalmayacak.
//? Projeyi nodemon ile çalışırabilmek için script objesine "'start':'node index.js'" yerine "'start':'nodemon index.js'" yazılmalıdır.

//! 4- Backend Node.js(express.js) Projesi Nasıl Oluşturulur. index.js Dosyasında Kodlama
//TODO A- Paketlerin import İşlemi
//? import express from "express";
//? import mongoose from "mongoose";
//? import cors from "cors";
//? import dotenv from "dotenv";

//TODO B- Paketleri Çağırma İşlemi
//? dotenv.config();

//? const app = express(); => Burada bir express uygulaması oluşturmuş olduk.
//? app.listen(process.env.PORT, () => {
//?   console.log(`${process.env.PORT}. portta dinliyor...`); =====> Burada oluşturduğumuz uygulama vasıtasıyla process.env.PORT'a kayıtlı olan portu dinlemeye başlıyoruz.
//? });                                                       =====> Mongoose'nin eklenmemiş hali...

//? app.listen(process.env.PORT, () => {
//?   mongoose                                                =====> Mongoose'nin eklenmiş hali...
//?     .connect(process.env.MONGO_URI, {
//?     })
//?     .then(() => console.log("Database bağlantısı başarılı..."))
//?     .catch((err) => console.log(err, "Database'ye bağlantı yapılamadı..."));
//? });

//? app.use(express.json({ limit: "20mb" }));
//? app.use(cors());

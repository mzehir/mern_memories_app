//! 1- CRUD nedir?
//? Crud create, read, update ve delete kelimelerinin kısaltılmış halidir.

//! 2- Backend'e yapılan istek tipleri nelerdir?
//TODO A- Get İsteği
//? Mesela veritabanından tüm anıları çekmek için backend'e get isteği göndeririz.

//TODO B- Post İsteği
//? Mesela veritabanına yeni bir anı kaydetmek için backend'e anıyla alakalı datalarımız ile post isteği göndeririz.

//TODO C- Delete İsteği
//? Mesela veritabanından bir anıyı silmek için backend'e, silmek istediğimiz anı id'si ile delete isteği göndeririz.

//TODO D- Put İsteği
//? Mesela veritabanında var olan bir anıyı değiştirmek, bilgilerini güncellemek için backend'e güncellemek istediğimiz anının id'si ile put isteği gönderiririz.

//! 3- Backend Node.js(express.js) Projesi Nasıl Oluşturulur. Olmassa Olmaz Paketler :)
//TODO A- package.json Dosyasının Oluşturulması
//? Bir backend projesi oluşturmak için öncelikle package.json dosyası oluşturulmalıdır. Bu dosya uygulamamız ile alakalı bilgileri içerir. Bir nevi uygulamamızın kimliği diyebiliriz.
//? Bu dosyayı oluşturmak için editörümüzün console'sine 'npm init' komutu yazılmalıdır ve çalıştırılmalıdır.

//? Backend projesinde modern import syntax'ı kullanabilmek için package.json dosyasında ki main değerinin bir alt satırına "'type':'module'" değeri eklenmelidir. Böylelikle sayfa importlarında 'require' yapısını kullanmamıza gerek kalmaz.

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
//? Bu modül sayesinde ortam değişkenlerini gizli tutabiliriz. Mesela db'ye bağlanmak için gereken connectionString bilgilei gibi. Kısacası hassas bilgilerin saklandığı dosya diyebiliriz.

//? Hassas bilgileri saklamak için '.env' dosyası oluşturulmalıdır. Ve içerisine yazılacak bilgi 'PORT = 5000' gibi bir syntax formatında yazılmalıdır.
//? Bu port bilgisini herhangi bir dosyada kullanabilmek için ise öncelikle dosyaya "import dotenv from 'dotenv'" importu yapılmalıdır. Daha sonra "dotenv.config()" çağrımı yapılmalıdır.
//? Daha sonra mesela app.listen(process.env.PORT,() =>{...}) gibi kullanılmalıdır.

// TODO F- VeriTabanının(Mongo Atlas) Modülünün Projeye Dahil Edilmesi(Mongoose ile)
//? Mongoose ile mongo veritabanına kolaylıkla bağlantı yapabiliriz. Yani bu paket MongoDB ile iletişim kurmamızı sağlar.
//? Bunu projeye dahil edebilmek için editörün console'sine "npm i mongoose" komutu yazıp çalıştırılmalıdır.

//? Aynı zamanda oluşturduğumuz MongoAtlas veritabanını projemize eklemek için veritabanının sunduğu connectionString bilgisini '.env' dosyasına kaydetmeliyiz.
//? Bu kayıt "MONGO_URI = mongodb+srv://Admin:456@anikutusu.5l8ko.mongodb.net/AniKutusu?retryWrites=true&w=majority" syntax'ında olmalıdır.
//? Yukarıdaki "456" kısmı bizim mongo veritabanı şifremiz olmalıdır. "AniKutusu" ise bizim veritabanımızın ismidir.

//? Bunu projeye dahil etmek için ana index.js dosyamıza "import mongoose from "mongoose";" importunu yapmalıyız.
//? app.listen(process.env.PORT, () => {
//?   mongoose                                   =====> Daha sonra ana index.js dosyamızdaki port dinleme kısmına mongo connectionString'ini mongoose ile eklememiz gerekir
//?     .connect(process.env.MONGO_URI, {
//?     })
//?     .then(() => console.log("Database bağlantısı başarılı..."))
//?     .catch((err) => console.log(err, "Database'ye bağlantı yapılamadı..."));
//? });

//? Daha sonrasında veritabanına veri kaydetmek için öncelikle bir schema sonrasında bunun bağlandığı bir veritabanı modeli oluşturmalıyız.
//? Mesela bir anı uygulaması projemizin var olduğunu düşünürsek bu projenin crud işlemleri için öncelikle "memoryModel.js"(isimlendirme değişebilir) adında bir dosya oluşturulmalıdır.
//? Daha sonra dosya içerisine sırasıyla aşağıdaki işlemler yapılmalıdır.

//?import mongoose from "mongoose";      =====> Bir model ve schema oluşturma için öncelikle mongoose import edilmeldir.
//? const memoSchema = mongoose.Schema({
//?   title: {
//?     type: String,
//?     required: true,
//?   },
//?   content: {
//?     type: String,
//?     required: true,                 =====> Sonrasında mongoosenin Schema özelliği kullanılarak veri schema'mız oluşturulmalıdır.
//?   },
//?   creator: {
//?     type: String,
//?     required: true,
//?   },
//?   image: {
//?     type: String,
//?   },
//?   createdAt: {
//?     type: Date,
//?     default: new Date(),
//?   },
//? });
//? const Memory = mongoose.model("memo", memoSchema); =====> Son olarak Memory adında mongoose'nin model özelliğini kullanarak modelimizi oluşturuyoruz. Yani mongoose modeli oluşturuyoruz.
//?                                                    =====> Mongoose.model'e ilk olarak database'de oluşturulacak olan modelin adını vermeliyiz. Yukarıda "memo" adını verdiğimizde modelimizin adı "memos olacaktır."
//?                                                    =====> Mongoose.model ikinci olarak oluşturulacak olan modelin iskeletini(schemasını) alır. Bunuda yukarıda "const memoSchema" adıyla tanımlamıştık.
//? export default Memory;                             =====> İşlemlerin sonunda bu şemayı yandaki dışarıya açıyoruz.

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

//Aşağısı dahil değil düzenlenecek...
//? app.use(express.json({ limit: "20mb" }));
//? app.use(cors());

//TODO C- Router'ları Tanımlama İşlemi
//? Türkçe karşılığı yönlendirmedir.
//? Router işlemleriinin kodların okunaklı olmasını sağlamak nedeniyle ayrı ayrı dosyalarda yapmak daha mantıklıdır.
//? Bu maksatla öncelikle ana dosya'mız ile aynı seviye "routers" klasörü açılmalıdır. Bu klasörün içerisine de routers dosyaları açılmalıdır.
//? Mesela anı ile alakalı projemiz olduğunu varsayarsak anı crud işlemlerinin yönlendirmeleri için "memoryRouter" adında dosya açılmalıdır.
//? Ve yine anı projemizin aut işlemleri olacak ise aynı klasör içerisine "userRouter" adında dosya açılmalıdır.
//? Bu dosyanın yazımı da aşağıdaki gibi olmalıdır.

//? import express from "express";           =====> Bir router dosyası oluşturuyor ise öncelikle express'i import etmeliyiz.
//? const router = express.Router();         =====> Daha sonra bir router değişkeni oluşturmalıyız. Ve bu değişkene express'in router özelliğini vermeliyiz.
//? export default router;                   =====> Ve son olarak bunu dışarıya export etmemiz devamında da ana index.js dosyasında tanımlamamız gerekir.
//?                                          =====> Çünkü router istekleri ilk olarak index.js dosyasına düşüyor. Daha sonra isteği oradan bu dosyaya yönlendireceğiz.

//? Sonrasında index.js ana dosyamzı aşağıdaki gibi güncellememiz gerekmektedir.

//? import express from "express";
//? import mongoose from "mongoose";
//? import cors from "cors";
//? import dotenv from "dotenv";
//? import memoryRouter from "./routers/memoryRouter.js";    =====> Yeni oluşturduğumuz router klasöründeki memoryRouter dosyasını buraya import ettik.

//? dotenv.config();
//? const app = express(); => Burada bir express uygulaması oluşturmuş olduk.
//? app.use("memories",memoryRouter)                          =====> http://localhost:3000/memories 'e gelen istekleri memoryRouter dosyasına yönlendirdik.
//? app.listen(process.env.PORT, () => {                      =====> Burada oluşturduğumuz uygulama vasıtasıyla process.env.PORT'a kayıtlı olan portu dinlemeye başlıyoruz.
//?   mongoose                                                =====> Mongoose'nin eklenmiş hali...
//?     .connect(process.env.MONGO_URI, {
//?     })
//?     .then(() => console.log("Database bağlantısı başarılı..."))
//?     .catch((err) => console.log(err, "Database'ye bağlantı yapılamadı..."));
//? });

//? Böylelikle http://localhost:3000/memories ' e gelen post, get, delete, update istekleri artık routers klasöründeki memoryRouter dosyasına düşecek. Fakat bu istek tipleri için ayarlama yapmamız gerekir.
//? Mesela
//? import express from "express";
//? const router = express.Router();
//? router.get("/", async (req,res) => {res.json({message:"http://localhost:3000/memories" routesine get isteği yaptınız."})}) =====> "http://localhost:3000/memories" routesine yapılan get isteğini karşılamış olduk.
//? export default router;

//! Ekstra (Authentication)
// TODO A- Authentication
//? Kullanıcı frontend'de form vasıtasıyla kullanıcı adı ve şifresini girer. Daha sonra bu bilgiler backend'e gönderilir. Backend kendisine gelen kullanıcı adı ve şifresini veritabanındaki kayıt ile karşılaştırır.
//? Karşılaştırma başarılı ise iki tip token oluşturuluyor. Bunlardan birincisi access token ki erişim tokeni anlamına gelir. Kullanıcının yetkilendirmesi için bu tokene ihtiyacı vardır.
//? Yani üretilen bu access token frontend'e gönderilir. Ve bu token localstroge'de tutulur. Ve kullanıcı her istek yaptığında(Mesela crud işlemleri) bu accessToken'de istek ile beraber server'a gönderilir.
//? Server yani backend(express) bu accessToken'ı çözer ve bu token geçerli ise kullanıcının işlemi yapılır. Fakat gönderilen tokenin mesela süresi dolmuş ise kullanıcıya 403 status kodu gönderilir.

//? Fakat access tokenin süresi dolmuş ise ilk girişte oluşturduğumuz ikinci tip token refresh tokene başvururuz. Bu token access tokeni yenilemek için kullanılır. Ve bu token access token gibi localStroge'de tutulmamalıdır.
//? Bu token database'de tutulmalıdır. Güvenlik açısından. Ve kullanıcı siteden çıkş yaptığında bu tokende database'den silinmelidir.

//? Bu tokenleri oluşturmak için JWT(JsonWebToken) paketi kullanılabilir.
//? JWT üç farklı bölümden oluşur. Birinci bölüm header kısmı, ikinci kısım payload kısmı ve üçüncü kısım ise signature kısmıdır.
//? Header kısmı tokenimizi tipi ve şifreleme algoritmasının ne olduğunu içerir. Bu kısma biz müdahale etmiyoruz.
//? Payload kısmı yani kullanıcıyla ilgili bilgilerimizin yer aldığı kısımdır. Burası kullanıcı emaili ve kullanıcı idsini içerebilir. Son olarak burası birde iat yani tokenin oluştuma tarihini içerir.
//? Signature yani imza kısmı ise header ve payloadın base64'de göre kodlamasıyla oluşabilir. Biz burada nodeJs içerisindeki kripto classını kullanarak bir string üretebilir ve burası için kullanabiliriz.

// TODO B- Authorization
//? Kullanıcının gerçekleştirmek istediği aksiyonlar için yetkisi olup olmadı noktasındaki kontrollerdir.
//? Mesela yeni bir anı oluşturma kısmında anı bilgileri gönderilen isteğin body'sinde gönderilir. Bir de ek olarak bu isteğin header kısmında accesToken bilgimizi(bearer tipinde) gönderiyoruz.
//? Eğer server bu bearer tipindeki tokeni başarılı bir şekilde verify edebiliyorsa yani doğrulayabiliyorsa anı oluşturma işi başarılı bir şekilde gerçekleşiyor.

//TODO C- Token Meselesinin Adım Adım İlerleyişi
//? Kullanıcı Frontend'de giriş formunu doldurur ve bu bilgileri backend'e gönderir.
//? Daha sonra backend kullanıcı bilgilerini veritabanındaki kullanıcı bilgileriyle karşılaştır ve eşleme başarılı ise access ve refresh token üretir.Access tokenin geçerlilik süresi burada belirlenir.
//? Backend ürettiği refresh tokeni kullanıcının id'si ile beraber veritabanına yazar.
//? Backend ürettiği access tokeni ise kullanıcının id'si ile beraber frontend'e cevap olar döner.
//? Frontend cevabı(olumlu ise) aldıktan sonra bu cevabı yani access tokeni localStroge'ye user keyiyle yazar.

//? Daha sonra kullanıcı root değiştirmek istediğinde açık oturum varmı durumuna ve access tokenin geçerlilik süresine bakılır ve süre dolmuş ise frontend backende mevcut kullanıcının id'si ile beraber yeni bir access token(token yenileme) isteğinde bulunur.
//? Backend bu isteği aldıktan sonra kendisine gelen kullanıcı id'si ile beraber veritabanına bağlanır. Ve ilk oturum açılırken üretilen ve veritabanına yazılan refresh token veritabanından alınır.
//? ...

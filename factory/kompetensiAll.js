import { faker } from '@faker-js/faker';
import { monFactory } from '../monFactory.js';

// Helper function to generate Rujukan objects with nama field
const createRujukan = (kod, nama, keterangan) => ({
  kod,
  nama,
  keterangan
});

// Helper function to generate old IC format
const generateOldIC = () => {
  const year = faker.number.int({ min: 1900, max: 1999 });
  const month = faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0');
  const day = faker.number.int({ min: 1, max: 28 }).toString().padStart(2, '0');
  const state = faker.number.int({ min: 1, max: 16 }).toString().padStart(2, '0');
  const sequence = faker.number.int({ min: 1, max: 9999 }).toString().padStart(4, '0');
  return `${year}${month}${day}-${state}-${sequence}`;
};

monFactory.create(
  {
    _key: "kompetensiAll",
    _repeat: 2,
    _dataKey: "data",
    _paginationKey: "pageMeta",
    _paginationData: {
      pageNumber: 1,
      totalPages: 5,
      totalCount: 250,
      hasPreviousPage: false,
      hasNextPage: true,
      pageSize: 50
    }
  },
  () => {
    const kodRujAgama = faker.helpers.arrayElement(['01', '02', '03', '04', '05']);
    const kodRujBangsa = faker.helpers.arrayElement(['01', '02', '03', '04', '05']);
    const kodRujEtnik = faker.helpers.arrayElement(['01', '02', '03', '04', '05']);
    const kodRujStatusUniform = faker.helpers.arrayElement(['01', '02', '03']);
    const kodRujJenisDarah = faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
    const kodRujStatusKahwin = faker.helpers.arrayElement(['01', '02', '03', '04']);
    const kodRujTahapPendidikan = faker.helpers.arrayElement(['01', '02', '03', '04', '05', '06', '07', '08']);
    const kodRujGelaran = faker.helpers.arrayElement(['01', '02', '03', '04', '05']);
    const kodRujJantina = faker.helpers.arrayElement(['L', 'P']);
    const kodRujNegeriLahir = faker.helpers.arrayElement(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14']);
    const kodRujNegaraLahir = faker.helpers.arrayElement(['MY', 'SG', 'ID', 'TH', 'PH']);
    const kodRujStatusWarganegara = faker.helpers.arrayElement(['01', '02', '03']);
    const kodRujPangkat = faker.helpers.arrayElement(['01', '02', '03', '04', '05', '06', '07', '08', null]);

    return {
      id: faker.string.uuid(),
      kodRujAgama,
      kodRujBangsa,
      kodRujEtnik,
      kodRujStatusUniform,
      kodRujJenisDarah,
      kodRujStatusKahwin,
      kodRujTahapPendidikan,
      kodRujGelaran,
      kodRujJantina,
      kodRujNegeriLahir,
      kodRujNegaraLahir,
      kodRujStatusWarganegara,
      kodRujPangkat,
      nama: faker.person.fullName(),
      emailRasmi: faker.internet.email(),
      emailPeribadi: faker.internet.email(),
      statusBumiputera: faker.helpers.arrayElement([true, false, null]),
      noSijilLahir: faker.string.alphanumeric(12).toUpperCase(),
      tarikhLahir: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
      noTelefonBimbit: faker.phone.number('01#-#### ####'),
      statusTelefonBimbit: faker.datatype.boolean(),
      noTelefonPejabat: faker.phone.number('0#-#### ####'),
      sambungan: faker.number.int({ min: 100, max: 999 }),
      statusRekod: faker.datatype.boolean(),
      kumpulanDarah: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', null]),
      jenisStatusUniform: faker.helpers.arrayElement(['Aktif', 'Tidak Aktif', 'Cuti', null]),
      noSambungan: faker.helpers.arrayElement([faker.number.int({ min: 100, max: 999 }).toString(), null]),
      gambar: faker.helpers.arrayElement([faker.image.avatar(), null]),
      noKadPengenalanLama: faker.helpers.arrayElement([generateOldIC(), null]),
      tarikhDikeluarkan: faker.helpers.arrayElement([faker.date.past().toISOString().split('T')[0], null]),
      warnaKadPengenalanLama: faker.helpers.arrayElement(['Merah', 'Hijau', 'Biru', 'Kuning', null]),
      jenisDokumenSokongan: faker.helpers.arrayElement(['Sijil Lahir', 'Kad Pengenalan', 'Pasport', null]),
      namaFail: faker.helpers.arrayElement([`document_${faker.string.alphanumeric(8)}.pdf`, null]),
      namaDokumenSokongan: faker.helpers.arrayElement([faker.system.fileName(), null]),
      
      // Nested Rujukan objects with nama field
      rujAgama: createRujukan(
        kodRujAgama, 
        faker.helpers.arrayElement(['Islam', 'Kristian', 'Buddha', 'Hindu', 'Lain-lain']),
        faker.helpers.arrayElement(['Agama rasmi negara', 'Agama Kristian', 'Agama Buddha', 'Agama Hindu', 'Agama lain'], null)
      ),
      rujEtnik: createRujukan(
        kodRujEtnik, 
        faker.helpers.arrayElement(['Melayu', 'Cina', 'India', 'Bumiputera Sabah', 'Bumiputera Sarawak']),
        faker.helpers.arrayElement(['Etnik Melayu', 'Etnik Cina', 'Etnik India', 'Bumiputera Sabah', 'Bumiputera Sarawak'], null)
      ),
      rujGelaran: createRujukan(
        kodRujGelaran, 
        faker.helpers.arrayElement(['Encik', 'Puan', 'Cik', 'Tuan', 'Datuk']),
        faker.helpers.arrayElement(['Gelaran untuk lelaki', 'Gelaran untuk wanita', 'Gelaran untuk wanita belum berkahwin', 'Gelaran hormat', 'Gelaran bangsawan'], null)
      ),
      rujJantina: createRujukan(
        kodRujJantina, 
        faker.helpers.arrayElement(['Lelaki', 'Perempuan']),
        faker.helpers.arrayElement(['Jantina lelaki', 'Jantina perempuan'], null)
      ),
      rujJenisDarah: createRujukan(
        kodRujJenisDarah, 
        kodRujJenisDarah,
        faker.helpers.arrayElement(['Kumpulan darah A positif', 'Kumpulan darah A negatif', 'Kumpulan darah B positif', 'Kumpulan darah B negatif', 'Kumpulan darah AB positif', 'Kumpulan darah AB negatif', 'Kumpulan darah O positif', 'Kumpulan darah O negatif'], null)
      ),
      rujNegaraLahir: createRujukan(
        kodRujNegaraLahir, 
        faker.helpers.arrayElement(['Malaysia', 'Singapura', 'Indonesia', 'Thailand', 'Filipina']),
        faker.helpers.arrayElement(['Negara Malaysia', 'Negara Singapura', 'Negara Indonesia', 'Negara Thailand', 'Negara Filipina'], null)
      ),
      rujNegeriLahir: createRujukan(
        kodRujNegeriLahir, 
        faker.helpers.arrayElement([
          'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 
          'Perak', 'Perlis', 'Pulau Pinang', 'Sabah', 'Sarawak', 'Selangor', 
          'Terengganu', 'Kuala Lumpur'
        ]),
        faker.helpers.arrayElement([
          'Negeri Johor', 'Negeri Kedah', 'Negeri Kelantan', 'Negeri Melaka', 'Negeri Sembilan', 'Negeri Pahang',
          'Negeri Perak', 'Negeri Perlis', 'Negeri Pulau Pinang', 'Negeri Sabah', 'Negeri Sarawak', 'Negeri Selangor',
          'Negeri Terengganu', 'Wilayah Persekutuan Kuala Lumpur'
        ], null)
      ),
      rujPangkat: kodRujPangkat ? createRujukan(
        kodRujPangkat, 
        faker.helpers.arrayElement(['Inspektor', 'Sarjan', 'Koperal', 'Lans Koperal', 'Prebet']),
        faker.helpers.arrayElement(['Pangkat Inspektor', 'Pangkat Sarjan', 'Pangkat Koperal', 'Pangkat Lans Koperal', 'Pangkat Prebet'], null)
      ) : null,
      rujStatusKahwin: createRujukan(
        kodRujStatusKahwin, 
        faker.helpers.arrayElement(['Bujang', 'Berkahwin', 'Bercerai', 'Janda/Duda']),
        faker.helpers.arrayElement(['Status bujang', 'Status berkahwin', 'Status bercerai', 'Status janda atau duda'], null)
      ),
      rujStatusUniform: createRujukan(
        kodRujStatusUniform, 
        faker.helpers.arrayElement(['Aktif', 'Tidak Aktif', 'Cuti']),
        faker.helpers.arrayElement(['Status uniform aktif', 'Status uniform tidak aktif', 'Status uniform cuti'], null)
      ),
      rujStatusWarganegara: createRujukan(
        kodRujStatusWarganegara, 
        faker.helpers.arrayElement(['Warganegara', 'Bukan Warganegara', 'Penduduk Tetap']),
        faker.helpers.arrayElement(['Status warganegara Malaysia', 'Status bukan warganegara', 'Status penduduk tetap'], null)
      ),
      rujTahapPendidikan: createRujukan(
        kodRujTahapPendidikan, 
        faker.helpers.arrayElement([
          'Sekolah Rendah', 'Sekolah Menengah', 'Diploma', 'Ijazah Sarjana Muda', 
          'Ijazah Sarjana', 'Doktor Falsafah', 'Sijil', 'Lain-lain'
        ]),
        faker.helpers.arrayElement([
          'Tahap pendidikan sekolah rendah', 'Tahap pendidikan sekolah menengah', 'Tahap pendidikan diploma', 'Tahap pendidikan ijazah sarjana muda',
          'Tahap pendidikan ijazah sarjana', 'Tahap pendidikan doktor falsafah', 'Tahap pendidikan sijil', 'Tahap pendidikan lain-lain'
        ], null)
      )
    };
  }
); 
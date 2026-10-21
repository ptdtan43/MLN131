/* Nội dung bài thuyết trình MLN131 · Nhóm 1: Quá độ lên chủ nghĩa xã hội ở Việt Nam.
   Nguồn: Giáo trình Chủ nghĩa xã hội khoa học (bản 2021 của nhóm), Chương 3, mục III (tr.109–124);
          slide bài giảng của TS. Ngô Khánh Duy, Chương 3, mục III.
   Muốn sửa chữ trên web, chỉ cần sửa file này. */

export const SOURCE =
  'Nguồn: Giáo trình Chủ nghĩa xã hội khoa học, Chương 3, mục III (tr.109–124); slide bài giảng TS. Ngô Khánh Duy.'

/* Thành viên nhóm: điền tên và mã số sinh viên để hiện ở trang Tổng quan. Để trống thì trang tự ẩn mục này. */
export const MEMBERS = [
  // { name: 'Nguyễn Văn A', studentId: 'SE190000' },
]

/* Nội dung thuyết trình, theo đúng thứ tự trong bảng chấm điểm. */
export const OUTLINE = [
  { to: '/mo-dau', title: 'Hoạt động mở đầu', body: 'Picture Rush: đổi hình bắt chữ, khoảng 5 phút. Câu cuối dẫn vào bài.' },
  { to: '/ly-thuyet', title: 'Lý thuyết bài học', body: 'Bỏ qua chế độ tư bản chủ nghĩa; đặc trưng và phương hướng xây dựng CNXH. Tối đa 10 phút.' },
  { to: '/game', title: 'Game ôn tập', body: 'Knowledge Derby: bốn đội đua trên con đường quá độ, khoảng 5 phút. Top 1 và Top 2 phần mở đầu nhận quyền lợi.' },
  { to: '/hoi-dap', title: 'Hỏi đáp', body: 'Câu hỏi của nhóm phản biện và của giảng viên.' },
]

/* Picture Rush (đổi hình bắt chữ), hoạt động mở đầu. Chín câu đố vui không liên quan bài học, câu cuối dẫn vào bài. Các đội viết đáp án lên bảng; hết giờ thì đáp án hiện ra để ghi điểm.
   sprites: tên hình pixel-art trong src/game/pixel.jsx; names: tên từng hình (hiện sau khi có đáp án).
   Muốn dùng ảnh thật thay hình pixel-art, thêm images: ['img/anh-1.jpg', 'img/anh-2.jpg'] vào câu đố. */
export const PICTURE_RUSH = {
  title: 'PICTURE RUSH',
  subtitle: 'Đổi hình bắt chữ',
  seconds: 30,
  autoHints: [20, 10],
  puzzles: [
    { sprites: ['moon', 'honey'], names: ['Trăng', 'Mật'], answer: 'TRĂNG MẬT', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['star', 'ice'], names: ['Sao', 'Băng'], answer: 'SAO BĂNG', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['flame', 'tent'], names: ['Lửa', 'Trại'], answer: 'LỬA TRẠI', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['sun', 'moon'], names: ['Ngày', 'Đêm'], answer: 'NGÀY ĐÊM', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['flower', 'apple'], names: ['Hoa', 'Quả'], answer: 'HOA QUẢ', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['mountain', 'river'], names: ['Non', 'Sông'], answer: 'NON SÔNG', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['apple', 'heart'], names: ['Trái', 'Tim'], answer: 'TRÁI TIM', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['ball', 'bulb'], names: ['Bóng', 'Đèn'], answer: 'BÓNG ĐÈN', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['hat', 'leaf'], names: ['Nón', 'Lá'], answer: 'NÓN LÁ', kind: 'Cụm từ gồm 2 từ' },
    { sprites: ['bridge', 'boat'], names: ['Qua', 'Đò'], answer: 'QUÁ ĐỘ', kind: 'Câu cuối: nghe giống nhau', final: true },
  ],
  finalTitle: 'QUÁ ĐỘ',
  finalLead: 'Đúng rồi: "qua đò" nghe giống "quá độ". Hôm nay ta nói về thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam.',
}

/* Trò chơi thẻ "Bỏ qua hay kế thừa?" (trang phụ, không nằm trên menu). answer: 'skip' là bỏ qua, 'keep' là kế thừa. Căn cứ giáo trình tr.111–112. */
export const OPENING = {
  title: 'Bỏ qua hay kế thừa?',
  how: 'Cả lớp giơ tay chọn. Bạn bấm theo số đông.',
  cards: [
    { text: 'Khoa học và công nghệ hiện đại của nhân loại', answer: 'keep',
      why: 'Phải tiếp thu, kế thừa thành tựu nhân loại, đặc biệt là khoa học và công nghệ.' },
    { text: 'Quan hệ sản xuất tư bản chủ nghĩa giữ vị trí thống trị', answer: 'skip',
      why: 'Bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa.' },
    { text: 'Thành tựu về quản lý phát triển xã hội', answer: 'keep',
      why: 'Đây là thành tựu của nhân loại, cần tiếp thu để xây dựng nền kinh tế hiện đại.' },
    { text: 'Kinh tế tư nhân tư bản chủ nghĩa giữ vai trò chủ đạo', answer: 'skip',
      why: 'Trong thời kỳ quá độ vẫn có nhiều thành phần kinh tế, nhưng thành phần này không giữ vai trò chủ đạo.' },
    { text: 'Những thành tựu mà nhân loại đạt được dưới chế độ tư bản chủ nghĩa', answer: 'keep',
      why: 'Bỏ qua chế độ tư bản chủ nghĩa không có nghĩa là bỏ hết mọi thành tựu của nó.' },
    { text: 'Quan hệ bóc lột tư bản chủ nghĩa giữ vai trò thống trị', answer: 'skip',
      why: 'Vẫn còn quan hệ bóc lột và bị bóc lột, nhưng nó không giữ vai trò thống trị.' },
  ],
  endTitle: 'Bỏ qua không có nghĩa là bỏ hết.',
  endLead: 'Bỏ qua cái thống trị, kế thừa cái tiến bộ. Giờ ta vào bài để xem điều đó có nghĩa thế nào.',
}

/* Phần lý thuyết */
export const THEORY = {
  eyebrow: 'Chủ nghĩa xã hội khoa học · Chương 3, mục III',
  intro: 'Bỏ qua chế độ tư bản chủ nghĩa, nhưng không bỏ qua những thành tựu của nhân loại.',

  lead: 'Quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa là sự lựa chọn duy nhất đúng, khoa học, phản ánh đúng quy luật phát triển khách quan của cách mạng Việt Nam trong thời đại ngày nay.',
  leadCite: 'Giáo trình, tr.110–111',

  kinds: [
    { title: 'Từ quá độ nói chung đến Việt Nam',
      points: [
        'Quá độ trực tiếp: dành cho nước đã trải qua chủ nghĩa tư bản phát triển. Cho đến nay chưa từng diễn ra.',
        'Quá độ gián tiếp: dành cho nước chưa qua chủ nghĩa tư bản phát triển. Liên Xô, Đông Âu trước đây, Trung Quốc, Việt Nam đều đi con đường này.',
        'Việt Nam thuộc loại gián tiếp.',
      ] },
    { title: 'Ba điều làm nên điểm xuất phát',
      points: [
        'Xuất phát điểm thấp: xã hội thuộc địa nửa phong kiến, lực lượng sản xuất rất thấp, hậu quả chiến tranh nặng nề.',
        'Thời cơ và thách thức: cách mạng khoa học công nghệ, quốc tế hóa sâu sắc.',
        'Thời đại vẫn là thời đại quá độ từ chủ nghĩa tư bản lên chủ nghĩa xã hội, dù Liên Xô và Đông Âu sụp đổ.',
      ] },
  ],

  choice: [
    'Cương lĩnh năm 1930: sau khi hoàn thành cách mạng dân tộc dân chủ nhân dân sẽ tiến lên chủ nghĩa xã hội.',
    'Đại hội IX làm rõ nghĩa của sự bỏ qua.',
    'Đáp ứng nguyện vọng thiết tha của dân tộc, phản ánh xu thế của thời đại, phù hợp quan điểm của chủ nghĩa Mác – Lênin.',
  ],

  compare: [
    { head: 'Bỏ qua', body: 'Việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa.' },
    { head: 'Kế thừa', body: 'Những thành tựu nhân loại đã đạt được dưới chủ nghĩa tư bản, đặc biệt là khoa học – công nghệ và quản lý phát triển xã hội.' },
  ],
  compareNote: 'Bỏ qua không có nghĩa là bỏ hết.',

  four: [
    { title: 'Con đường tất yếu khách quan', body: 'Là con đường cách mạng, con đường xây dựng đất nước trong thời kỳ quá độ ở nước ta.' },
    { title: 'Bỏ qua sự thống trị của tư bản', body: 'Bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa.' },
    { title: 'Kế thừa thành tựu nhân loại', body: 'Tiếp thu khoa học, công nghệ, quản lý phát triển xã hội; xây dựng nền kinh tế hiện đại, phát triển nhanh lực lượng sản xuất.' },
    { title: 'Biến đổi về chất, lâu dài', body: 'Sự nghiệp rất khó khăn, phức tạp, qua nhiều chặng đường; cần quyết tâm chính trị cao và khát vọng lớn của toàn Đảng, toàn dân.' },
  ],

  mixed: [
    { label: 'Sở hữu', role: 'Nhiều hình thức', body: 'Sở hữu tư nhân tư bản chủ nghĩa không giữ vai trò chủ đạo.' },
    { label: 'Kinh tế', role: 'Nhiều thành phần', body: 'Nhiều thành phần kinh tế cùng tồn tại, nhưng thành phần tư nhân tư bản chủ nghĩa không giữ vai trò chủ đạo.' },
    { label: 'Phân phối', role: 'Theo lao động là chủ đạo', body: 'Bên cạnh đó còn phân phối theo mức đóng góp vốn và phúc lợi xã hội.' },
    { label: 'Bóc lột', role: 'Còn, nhưng không thống trị', body: 'Vẫn còn quan hệ bóc lột và bị bóc lột, nhưng nó không giữ vai trò thống trị.' },
  ],
  mixedSummary: 'Có thể cùng tồn tại, nhưng tư bản chủ nghĩa không còn là cái thống trị.',

  examples: [
    'Doanh nghiệp nhà nước, hợp tác xã, doanh nghiệp tư nhân và doanh nghiệp có vốn đầu tư nước ngoài cùng hoạt động trong một nền kinh tế.',
    'Việt Nam gia nhập ASEAN năm 1995 và WTO năm 2007, mở đường cho thương mại và công nghệ của thế giới vào nền kinh tế.',
    'Đại hội XIII đặt ra yêu cầu phát triển kinh tế số, chuyển đổi số quốc gia.',
  ],

  awareness: [
    { year: '1976', title: 'Đại hội IV', body: 'Nhận thức về chủ nghĩa xã hội và con đường đi lên mới dừng ở mức định hướng.', result: 'Mức định hướng' },
    { year: '1991', title: 'Đại hội VII, Cương lĩnh xây dựng đất nước trong thời kỳ quá độ', body: 'Mô hình chủ nghĩa xã hội được xác định với sáu đặc trưng.', result: 'Sáu đặc trưng' },
    { year: '2011', title: 'Đại hội XI, Cương lĩnh bổ sung, phát triển', body: 'Trên cơ sở tổng kết 25 năm đổi mới, mô hình được phát triển với tám đặc trưng.', result: 'Tám đặc trưng' },
    { year: '2021', title: 'Đại hội XIII', body: 'Xác định mục tiêu đến 2025, 2030, 2045 và 12 định hướng phát triển đất nước.', result: 'Mục tiêu và 12 định hướng' },
  ],

  traits: [
    ['Dân giàu, nước mạnh', 'Dân chủ, công bằng, văn minh.'],
    ['Do nhân dân làm chủ', 'Nhân dân là chủ thể của xã hội.'],
    ['Kinh tế phát triển cao', 'Lực lượng sản xuất hiện đại, quan hệ sản xuất tiến bộ phù hợp.'],
    ['Văn hóa tiên tiến', 'Đậm đà bản sắc dân tộc.'],
    ['Con người ấm no, tự do', 'Hạnh phúc, có điều kiện phát triển toàn diện.'],
    ['Các dân tộc bình đẳng', 'Đoàn kết, tôn trọng và giúp nhau cùng phát triển.'],
    ['Nhà nước pháp quyền XHCN', 'Của nhân dân, do nhân dân, vì nhân dân, do Đảng Cộng sản lãnh đạo.'],
    ['Hữu nghị, hợp tác', 'Quan hệ hữu nghị và hợp tác với các nước trên thế giới.'],
  ],

  directions: [
    ['Công nghiệp hóa, hiện đại hóa', 'Gắn với kinh tế tri thức, bảo vệ tài nguyên, môi trường.'],
    ['Kinh tế thị trường', 'Định hướng xã hội chủ nghĩa.'],
    ['Văn hóa và con người', 'Văn hóa tiên tiến; nâng cao đời sống; tiến bộ và công bằng xã hội.'],
    ['Quốc phòng, an ninh', 'Bảo đảm vững chắc quốc phòng, an ninh, trật tự, an toàn xã hội.'],
    ['Đối ngoại', 'Độc lập, tự chủ, hòa bình, hữu nghị; chủ động hội nhập quốc tế.'],
    ['Dân chủ và đại đoàn kết', 'Xây dựng dân chủ xã hội chủ nghĩa; mặt trận dân tộc thống nhất.'],
    ['Nhà nước pháp quyền', 'Của nhân dân, do nhân dân, vì nhân dân.'],
    ['Xây dựng Đảng', 'Trong sạch, vững mạnh.'],
  ],
  directionsNote: 'Cương lĩnh bổ sung, phát triển năm 2011. Cương lĩnh năm 1991 trước đó có bảy phương hướng.',

  relations: [
    'Đổi mới, ổn định và phát triển',
    'Đổi mới kinh tế và đổi mới chính trị',
    'Kinh tế thị trường và định hướng xã hội chủ nghĩa',
    'Lực lượng sản xuất và quan hệ sản xuất xã hội chủ nghĩa',
    'Tăng trưởng kinh tế, văn hóa, tiến bộ và công bằng xã hội',
    'Xây dựng chủ nghĩa xã hội và bảo vệ Tổ quốc',
    'Độc lập, tự chủ và hội nhập quốc tế',
    'Đảng lãnh đạo, Nhà nước quản lý, nhân dân làm chủ',
  ],

  goals: [
    ['2025', 'Kỷ niệm 50 năm giải phóng miền Nam, thống nhất đất nước: nước đang phát triển, có công nghiệp theo hướng hiện đại, vượt qua mức thu nhập trung bình thấp.'],
    ['2030', 'Kỷ niệm 100 năm thành lập Đảng: nước đang phát triển, có công nghiệp hiện đại, thu nhập trung bình cao.'],
    ['2045', 'Kỷ niệm 100 năm thành lập nước: trở thành nước phát triển, thu nhập cao.'],
  ],
  goalDirections: [
    'Đổi mới tư duy, hoàn thiện thể chế phát triển bền vững',
    'Hoàn thiện thể chế kinh tế thị trường, công nghiệp hóa, chuyển đổi số',
    'Đột phá giáo dục, đào tạo, nhân lực chất lượng cao',
    'Phát triển con người và văn hóa Việt Nam',
    'Quản lý phát triển xã hội, bảo đảm an sinh',
    'Thích ứng biến đổi khí hậu, bảo vệ môi trường',
    'Bảo vệ độc lập, chủ quyền, an ninh',
    'Đối ngoại, hội nhập quốc tế',
    'Phát huy dân chủ, đại đoàn kết toàn dân tộc',
    'Xây dựng Nhà nước pháp quyền xã hội chủ nghĩa',
    'Xây dựng Đảng và hệ thống chính trị',
    'Nắm vững và xử lý tốt các mối quan hệ lớn',
  ],
  goalsNote: 'Mốc 2025 là mục tiêu đã đề ra. Chỉ nêu số liệu thực tế khi nhóm đã kiểm chứng nguồn.',

  wrap: {
    title: 'Bỏ qua cái thống trị. Kế thừa cái tiến bộ.',
    body: 'Con đường nước ta chọn là quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa: lâu dài, nhiều chặng, cần quyết tâm của toàn Đảng, toàn dân.',
  },

  /* Gợi ý nói: bấm "Gợi ý nói" cuối mỗi phần. Mỗi mục có thời gian gợi ý để tổng phần lý thuyết không quá 10 phút. */
  notes: {
    one: [
      'Khoảng 5 phút cho cả phần 01.',
      'Nối từ phần của giảng viên: hai loại quá độ; nước ta là gián tiếp.',
      'Nhấn mạnh luận điểm trung tâm: lựa chọn duy nhất đúng, ba lý do.',
      'Quay lại trò chơi mở đầu để giải thích "bỏ qua" khác "bỏ hết".',
      'Bốn nội dung của sự bỏ qua: nói bằng lời của mình, không đọc nguyên văn.',
      'Ví dụ cho nội dung thứ hai và thứ ba: hãy thay bằng ví dụ nhóm đã kiểm chứng.',
    ],
    two: [
      'Khoảng 5 phút cho cả phần 02.',
      'Nhận thức đi từ định hướng đến định hình: 1976, 1991, 2011, 2021. Công cuộc đổi mới bắt đầu từ Đại hội VI năm 1986.',
      'Tám đặc trưng: gom thành nhóm kinh tế, chính trị, văn hóa, con người, đối ngoại.',
      'Tám phương hướng theo Cương lĩnh bổ sung 2011; Cương lĩnh 1991 có bảy.',
      'Mục tiêu 2025, 2030, 2045 và 12 định hướng là phần cập nhật theo Đại hội XIII.',
    ],
  },
}

/* Trang Hỏi đáp */
export const QA = {
  exam: {
    title: 'Ba câu hỏi cuối Chương 3',
    items: [
      ['Phân tích điều kiện ra đời và những đặc trưng của chủ nghĩa xã hội. Liên hệ thực tiễn Việt Nam?',
        'Điều kiện kinh tế: lực lượng sản xuất xã hội hóa cao mâu thuẫn với quan hệ sản xuất tư nhân tư bản chủ nghĩa. Điều kiện chính trị – xã hội: giai cấp công nhân đối lập giai cấp tư sản, trưởng thành và có Đảng Cộng sản lãnh đạo. Đặc trưng: giải phóng con người; kinh tế phát triển cao, công hữu về tư liệu sản xuất chủ yếu; nhân dân lao động làm chủ; nhà nước kiểu mới; văn hóa phát triển cao; bình đẳng giữa các dân tộc, hữu nghị với các nước. Liên hệ: tám đặc trưng của chủ nghĩa xã hội Việt Nam.'],
      ['Phân tích tính tất yếu, đặc điểm của thời kỳ quá độ lên chủ nghĩa xã hội. Liên hệ thực tiễn ở Việt Nam?',
        'Tính tất yếu: giữa chủ nghĩa tư bản và chủ nghĩa cộng sản có một thời kỳ cải biến cách mạng (C. Mác); cần thời gian để cải tạo xã hội cũ, xây dựng xã hội mới. Hai loại quá độ: trực tiếp và gián tiếp. Đặc điểm: kinh tế nhiều thành phần (V.I. Lênin nêu năm thành phần); chính trị có chuyên chính vô sản; tư tưởng – văn hóa có nhiều tư tưởng cùng tồn tại; xã hội còn nhiều giai cấp, tầng lớp vừa hợp tác vừa đấu tranh. Liên hệ: Việt Nam quá độ gián tiếp, bỏ qua chế độ tư bản chủ nghĩa.'],
      ['Phân tích luận điểm của Đảng Cộng sản Việt Nam về con đường đi lên chủ nghĩa xã hội của nước ta là sự phát triển quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa?',
        'Đây là lựa chọn dứt khoát và đúng đắn của Đảng: đáp ứng nguyện vọng thiết tha của dân tộc, phản ánh xu thế của thời đại, phù hợp quan điểm của chủ nghĩa Mác – Lênin. Bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa, nhưng tiếp thu thành tựu nhân loại. Gồm bốn nội dung: tất yếu khách quan; bỏ qua sự thống trị của tư bản; kế thừa thành tựu nhân loại; biến đổi về chất, lâu dài và nhiều chặng.'],
    ],
  },
  more: {
    title: 'Những câu dễ gặp',
    items: [
      ['Bỏ qua chế độ tư bản chủ nghĩa có phải là phủ nhận mọi thứ của tư bản không?',
        'Không. Chỉ bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa; vẫn phải tiếp thu thành tựu nhân loại, nhất là khoa học – công nghệ và quản lý phát triển xã hội.'],
      ['Vì sao trong thời kỳ quá độ vẫn có kinh tế tư nhân và bóc lột?',
        'Vì thời kỳ quá độ còn nhiều hình thức sở hữu, nhiều thành phần kinh tế. Kinh tế tư nhân tư bản chủ nghĩa không giữ vai trò chủ đạo; quan hệ bóc lột vẫn còn nhưng không giữ vai trò thống trị.'],
      ['Vì sao nói đây là lựa chọn duy nhất đúng?',
        'Vì nó đáp ứng nguyện vọng thiết tha của dân tộc, phản ánh xu thế của thời đại, phù hợp quan điểm khoa học, cách mạng và sáng tạo của chủ nghĩa Mác – Lênin, và đúng quy luật phát triển khách quan của cách mạng Việt Nam.'],
      ['Quá độ trực tiếp và quá độ gián tiếp khác nhau thế nào?',
        'Trực tiếp: dành cho nước đã qua chủ nghĩa tư bản phát triển, cho đến nay chưa từng diễn ra. Gián tiếp: dành cho nước chưa qua chủ nghĩa tư bản phát triển, Việt Nam thuộc loại này.'],
      ['Vì sao thời kỳ quá độ ở nước ta kéo dài?',
        'Vì đó là sự biến đổi về chất của xã hội trên mọi lĩnh vực, rất khó khăn, phức tạp, đi qua nhiều chặng đường và nhiều hình thức tổ chức kinh tế – xã hội mang tính quá độ.'],
      ['Quan điểm đi lên chủ nghĩa xã hội của Đảng có từ khi nào?',
        'Từ Cương lĩnh năm 1930: sau khi hoàn thành cách mạng dân tộc dân chủ nhân dân sẽ tiến lên chủ nghĩa xã hội. Công cuộc đổi mới bắt đầu từ Đại hội VI năm 1986.'],
    ],
  },
}

/* Ảnh minh họa (tùy chọn). Khi có ảnh thật, thêm một khối vào đây rồi chép file ảnh vào thư mục public/img/.
   Ví dụ:
   'doi-moi-1986': {
     file: 'img/doi-moi-1986.jpg',
     alt: 'Mô tả ngắn nội dung ảnh',
     caption: 'Chú thích ngắn hiện dưới ảnh',
     credit: 'Tên tác giả hoặc cơ quan',
     source: 'https://địa-chỉ-trang-chứa-ảnh',
     license: 'Giấy phép (ví dụ CC BY-SA 4.0 hoặc Public domain)',
   }
   Khóa dùng trong trang: 'khoi-dau' (phần 01, bên cạnh câu kết luận), 'doi-moi' (phần 02, bên cạnh nhận thức qua các đại hội). */
export const IMAGES = {}

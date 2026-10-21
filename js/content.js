/* Nội dung bài thuyết trình: Quá độ lên chủ nghĩa xã hội ở Việt Nam.
   Nguồn: Giáo trình CNXHKH (bản 2021 của nhóm), Chương 3, mục III (tr.109–124);
          slide bài giảng của TS. Ngô Khánh Duy, Chương 3, mục III.
   Muốn sửa chữ trên web, chỉ cần sửa file này. */
window.CONTENT = {
  group: 'Nhóm 1',
  course: 'MLN131 · Chủ nghĩa xã hội khoa học',
  school: 'Đại học FPT TP.HCM',
  source: 'Nguồn: Giáo trình Chủ nghĩa xã hội khoa học, Chương 3, mục III (tr.109–124); slide bài giảng TS. Ngô Khánh Duy.',

  hero: {
    title: ['Quá độ lên CNXH', 'ở Việt Nam'],
    lead: 'Chơi một ván trước khi vào bài: mỗi thẻ là một thứ mà nước ta phải bỏ qua, hoặc phải kế thừa.',
    action: 'Chơi ngay',
    place: 'Nhóm 1 · Đại học FPT TP.HCM'
  },

  /* Trò chơi mở đầu: "Bỏ qua hay kế thừa?"
     answer: 'skip' = bỏ qua, 'keep' = kế thừa. Căn cứ: giáo trình tr.111–112. */
  game: {
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
        why: 'Vẫn còn quan hệ bóc lột và bị bóc lột, nhưng nó không giữ vai trò thống trị.' }
    ],
    endTitle: 'Bỏ qua không có nghĩa là bỏ hết.',
    endLead: 'Bỏ qua cái thống trị, kế thừa cái tiến bộ. Giờ ta vào bài để xem điều đó có nghĩa thế nào.',
    endAction: 'Vào bài'
  },

  /* Phần lý thuyết (khoảng 10 phút, 13 màn hình, mỗi màn khoảng 45 giây). */
  theory: [
    {
      id: 'bridge', field: 'red', layout: 'bridge', short: 'Từ quá độ nói chung',
      title: ['Từ quá độ nói chung', 'đến Việt Nam'],
      cols: [
        { head: 'Quá độ trực tiếp', body: 'Dành cho nước đã trải qua chủ nghĩa tư bản phát triển. Cho đến nay chưa từng diễn ra.' },
        { head: 'Quá độ gián tiếp', body: 'Dành cho nước chưa qua chủ nghĩa tư bản phát triển. Liên Xô, Đông Âu trước đây, Trung Quốc, Việt Nam đều đi con đường này.' }
      ],
      lead: 'Việt Nam thuộc loại gián tiếp: từ một xã hội thuộc địa nửa phong kiến, đi lên chủ nghĩa xã hội mà bỏ qua chế độ tư bản chủ nghĩa.',
      notes: ['Nối từ phần của giảng viên: thời kỳ quá độ là tất yếu.', 'Hai loại quá độ. Nhấn mạnh nước ta là gián tiếp.', 'Khoảng 30 giây.'],
      cite: 'Giáo trình tr.105'
    },
    {
      id: 'context', field: 'black', layout: 'poster', short: 'Điểm xuất phát', img: 'xuat-phat',
      title: ['Ba điều làm nên', 'điểm xuất phát'],
      items: [
        ['Xuất phát điểm thấp', 'Xã hội thuộc địa nửa phong kiến, lực lượng sản xuất rất thấp. Chiến tranh kéo dài để lại hậu quả nặng nề, tàn dư thực dân phong kiến còn nhiều.'],
        ['Thời cơ và thách thức', 'Cách mạng khoa học và công nghệ hiện đại, quốc tế hóa sâu sắc: vừa tạo thời cơ phát triển nhanh, vừa đặt ra thách thức gay gắt.'],
        ['Thời đại quá độ vẫn còn', 'Thời đại vẫn là thời đại quá độ từ chủ nghĩa tư bản lên chủ nghĩa xã hội, dù chế độ xã hội chủ nghĩa ở Liên Xô và Đông Âu sụp đổ.']
      ],
      notes: ['Ba đặc điểm bối cảnh của nước ta.', 'Gợi ý ví dụ: hình ảnh đất nước sau chiến tranh (cần ảnh có nguồn).', 'Khoảng 45 giây.'],
      cite: 'Giáo trình tr.110'
    },
    {
      id: 'choice', field: 'gold', layout: 'statement', short: 'Lựa chọn duy nhất đúng', img: 'cuong-linh-1930',
      title: ['Lựa chọn duy nhất đúng'],
      lead: 'Quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa là sự lựa chọn duy nhất đúng, khoa học, phản ánh đúng quy luật phát triển khách quan của cách mạng Việt Nam trong thời đại ngày nay.',
      points: [
        'Cương lĩnh năm 1930: sau khi hoàn thành cách mạng dân tộc dân chủ nhân dân sẽ tiến lên chủ nghĩa xã hội.',
        'Đại hội IX làm rõ nghĩa của sự bỏ qua.',
        'Đáp ứng nguyện vọng thiết tha của dân tộc, phản ánh xu thế của thời đại, phù hợp quan điểm của chủ nghĩa Mác – Lênin.'
      ],
      notes: ['Đây là luận điểm trung tâm của cả phần.', 'Ba lý do: nguyện vọng dân tộc, xu thế thời đại, quan điểm Mác – Lênin.', 'Khoảng 50 giây.'],
      cite: 'Giáo trình tr.110–111'
    },
    {
      id: 'meaning', field: 'red', layout: 'compare', short: 'Bỏ qua cái gì',
      title: ['Bỏ qua cái gì,', 'giữ lại cái gì?'],
      sides: [
        { head: 'Bỏ qua', body: 'Việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa.' },
        { head: 'Kế thừa', body: 'Những thành tựu nhân loại đã đạt được dưới chủ nghĩa tư bản, đặc biệt là khoa học – công nghệ và quản lý phát triển xã hội.' }
      ],
      lead: 'Bỏ qua không có nghĩa là bỏ hết.',
      notes: ['Quay lại trò chơi mở đầu: ba thẻ bỏ qua, ba thẻ kế thừa.', 'Đây là chỗ dễ hiểu sai nhất.', 'Khoảng 45 giây.'],
      cite: 'Giáo trình tr.111'
    },
    {
      id: 'four', field: 'black', layout: 'poster', short: 'Bốn nội dung', dense: true,
      title: ['Bốn nội dung của', 'sự bỏ qua'],
      items: [
        ['Con đường tất yếu khách quan', 'Là con đường cách mạng, con đường xây dựng đất nước trong thời kỳ quá độ ở nước ta.'],
        ['Bỏ qua sự thống trị của tư bản', 'Bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa.'],
        ['Kế thừa thành tựu nhân loại', 'Tiếp thu khoa học, công nghệ, quản lý phát triển xã hội; xây dựng nền kinh tế hiện đại, phát triển nhanh lực lượng sản xuất.'],
        ['Biến đổi về chất, lâu dài', 'Sự nghiệp rất khó khăn, phức tạp, qua nhiều chặng đường; cần quyết tâm chính trị cao và khát vọng lớn của toàn Đảng, toàn dân.']
      ],
      notes: ['Đọc lướt bốn đầu mục, giải thích bằng lời của mình.', 'Không đọc nguyên văn.', 'Khoảng 50 giây.'],
      cite: 'Giáo trình tr.111–112'
    },
    {
      id: 'mixed', field: 'gold', layout: 'poster', short: 'Cùng tồn tại', img: 'kinh-te-nhieu-thanh-phan',
      title: ['Cùng tồn tại,', 'nhưng không thống trị'],
      items: [
        ['Nhiều hình thức sở hữu', 'Nhiều thành phần kinh tế cùng tồn tại. Sở hữu tư nhân và kinh tế tư nhân tư bản chủ nghĩa không giữ vai trò chủ đạo.'],
        ['Nhiều hình thức phân phối', 'Phân phối theo lao động vẫn là chủ đạo, bên cạnh phân phối theo mức đóng góp vốn và phúc lợi xã hội.'],
        ['Vẫn còn bóc lột', 'Vẫn còn quan hệ bóc lột và bị bóc lột, nhưng nó không giữ vai trò thống trị.']
      ],
      example: 'Doanh nghiệp nhà nước, hợp tác xã, doanh nghiệp tư nhân và doanh nghiệp có vốn đầu tư nước ngoài cùng hoạt động trong một nền kinh tế.',
      notes: ['Giải thích nội dung thứ hai của sự bỏ qua.', 'Ví dụ: các thành phần kinh tế đang cùng tồn tại ở Việt Nam. Hãy thay bằng ví dụ nhóm đã kiểm chứng.', 'Khoảng 55 giây.'],
      cite: 'Giáo trình tr.112'
    },
    {
      id: 'inherit', field: 'red', layout: 'statement', short: 'Kế thừa để phát triển nhanh', img: 'hoi-nhap',
      title: ['Kế thừa để', 'phát triển nhanh'],
      lead: 'Tiếp thu khoa học – công nghệ và kinh nghiệm quản lý của nhân loại để phát triển nhanh lực lượng sản xuất, xây dựng nền kinh tế hiện đại.',
      points: [
        'Gia nhập ASEAN năm 1995 và WTO năm 2007, mở đường cho thương mại và công nghệ của thế giới vào nền kinh tế.',
        'Đại hội XIII đặt ra yêu cầu phát triển kinh tế số, chuyển đổi số quốc gia.'
      ],
      pointsLabel: 'Ví dụ.',
      notes: ['Ví dụ cho nội dung thứ ba: kế thừa thành tựu nhân loại.', 'Có thể thay bằng ví dụ gần gũi sinh viên (thanh toán QR, học trực tuyến).', 'Khoảng 45 giây.'],
      cite: 'Giáo trình tr.111–112, tr.119'
    },
    {
      id: 'awareness', field: 'black', layout: 'timeline', short: 'Nhận thức qua các đại hội', img: 'doi-moi-1986',
      title: ['Nhận thức về CNXH', 'ngày càng sáng rõ'],
      rows: [
        ['1976', 'Đại hội IV: nhận thức về chủ nghĩa xã hội và con đường đi lên mới dừng ở mức định hướng.'],
        ['1991', 'Đại hội VII, Cương lĩnh xây dựng đất nước trong thời kỳ quá độ: sáu đặc trưng của chủ nghĩa xã hội.'],
        ['2011', 'Đại hội XI, Cương lĩnh bổ sung, phát triển: tám đặc trưng của chủ nghĩa xã hội.'],
        ['2021', 'Đại hội XIII: mục tiêu đến 2025, 2030, 2045 và 12 định hướng phát triển đất nước.']
      ],
      notes: ['Công cuộc đổi mới bắt đầu từ Đại hội VI (1986).', 'Nhận thức đi từ định hướng đến định hình, định lượng.', 'Khoảng 45 giây.'],
      cite: 'Giáo trình tr.112–114'
    },
    {
      id: 'traits', field: 'gold', layout: 'poster', short: 'Tám đặc trưng', dense: true,
      title: ['Tám đặc trưng của', 'CNXH Việt Nam'],
      items: [
        ['Dân giàu, nước mạnh', 'Dân chủ, công bằng, văn minh.'],
        ['Do nhân dân làm chủ', 'Nhân dân là chủ thể của xã hội.'],
        ['Kinh tế phát triển cao', 'Lực lượng sản xuất hiện đại, quan hệ sản xuất tiến bộ phù hợp.'],
        ['Văn hóa tiên tiến', 'Đậm đà bản sắc dân tộc.'],
        ['Con người ấm no, tự do', 'Hạnh phúc, có điều kiện phát triển toàn diện.'],
        ['Các dân tộc bình đẳng', 'Đoàn kết, tôn trọng và giúp nhau cùng phát triển.'],
        ['Nhà nước pháp quyền XHCN', 'Của nhân dân, do nhân dân, vì nhân dân, do Đảng Cộng sản lãnh đạo.'],
        ['Hữu nghị, hợp tác', 'Quan hệ hữu nghị và hợp tác với các nước trên thế giới.']
      ],
      notes: ['Tám đặc trưng theo Cương lĩnh bổ sung, phát triển năm 2011.', 'Gom thành các nhóm: kinh tế, chính trị, văn hóa, con người, đối ngoại.', 'Khoảng 55 giây.'],
      cite: 'Giáo trình tr.114'
    },
    {
      id: 'directions', field: 'red', layout: 'poster', short: 'Tám phương hướng', dense: true,
      title: ['Tám phương hướng', 'xây dựng CNXH'],
      items: [
        ['Công nghiệp hóa, hiện đại hóa', 'Gắn với kinh tế tri thức, bảo vệ tài nguyên, môi trường.'],
        ['Kinh tế thị trường', 'Định hướng xã hội chủ nghĩa.'],
        ['Văn hóa và con người', 'Văn hóa tiên tiến; nâng cao đời sống; tiến bộ và công bằng xã hội.'],
        ['Quốc phòng, an ninh', 'Bảo đảm vững chắc quốc phòng, an ninh, trật tự, an toàn xã hội.'],
        ['Đối ngoại', 'Độc lập, tự chủ, hòa bình, hữu nghị; chủ động hội nhập quốc tế.'],
        ['Dân chủ và đại đoàn kết', 'Xây dựng dân chủ xã hội chủ nghĩa; mặt trận dân tộc thống nhất.'],
        ['Nhà nước pháp quyền', 'Của nhân dân, do nhân dân, vì nhân dân.'],
        ['Xây dựng Đảng', 'Trong sạch, vững mạnh.']
      ],
      notes: ['Tám phương hướng của Cương lĩnh bổ sung, phát triển năm 2011.', 'Cương lĩnh 1991 trước đó có bảy phương hướng.', 'Khoảng 55 giây.'],
      cite: 'Giáo trình tr.114–117'
    },
    {
      id: 'relations', field: 'black', layout: 'poster', short: 'Tám mối quan hệ lớn', dense: true,
      title: ['Tám mối quan hệ lớn', 'cần giải quyết'],
      items: [
        ['Đổi mới, ổn định, phát triển', 'Ba việc đi cùng nhau.'],
        ['Kinh tế và chính trị', 'Đổi mới kinh tế đi đôi với đổi mới chính trị.'],
        ['Thị trường và định hướng XHCN', 'Kinh tế thị trường nhưng giữ định hướng xã hội chủ nghĩa.'],
        ['Lực lượng và quan hệ sản xuất', 'Phát triển lực lượng sản xuất, hoàn thiện từng bước quan hệ sản xuất xã hội chủ nghĩa.'],
        ['Tăng trưởng và công bằng', 'Tăng trưởng kinh tế gắn với văn hóa, tiến bộ và công bằng xã hội.'],
        ['Xây dựng và bảo vệ', 'Xây dựng chủ nghĩa xã hội và bảo vệ Tổ quốc.'],
        ['Tự chủ và hội nhập', 'Độc lập, tự chủ gắn với hội nhập quốc tế.'],
        ['Đảng, Nhà nước, nhân dân', 'Đảng lãnh đạo, Nhà nước quản lý, nhân dân làm chủ.']
      ],
      notes: ['Tám mối quan hệ lớn theo Cương lĩnh bổ sung, phát triển năm 2011.', 'Chọn một hai mối quan hệ để lấy ví dụ nếu còn thời gian.', 'Khoảng 45 giây.'],
      cite: 'Giáo trình tr.117'
    },
    {
      id: 'goals', field: 'gold', layout: 'figures', short: 'Mục tiêu Đại hội XIII', img: 'muc-tieu',
      title: ['Mục tiêu của', 'Đại hội XIII'],
      figures: [
        ['2025', 'Kỷ niệm 50 năm giải phóng miền Nam, thống nhất đất nước: nước đang phát triển, có công nghiệp theo hướng hiện đại, vượt qua mức thu nhập trung bình thấp.'],
        ['2030', 'Kỷ niệm 100 năm thành lập Đảng: nước đang phát triển, có công nghiệp hiện đại, thu nhập trung bình cao.'],
        ['2045', 'Kỷ niệm 100 năm thành lập nước: trở thành nước phát triển, thu nhập cao.']
      ],
      directionsTitle: '12 định hướng phát triển giai đoạn 2021–2030',
      directions: [
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
        'Nắm vững và xử lý tốt các mối quan hệ lớn'
      ],
      notes: ['Phần cập nhật theo Đại hội XIII, có trong giáo trình bản 2021.', 'Mốc 2025 là mục tiêu đã đề ra. Chỉ nói số liệu thực tế nếu nhóm đã kiểm chứng nguồn.', 'Khoảng 50 giây.'],
      cite: 'Giáo trình tr.117–123'
    },
    {
      id: 'wrap', field: 'red', layout: 'close', short: 'Tóm lại',
      title: ['Bỏ qua cái thống trị.', 'Kế thừa cái tiến bộ.'],
      lead: 'Con đường nước ta chọn là quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa: lâu dài, nhiều chặng, cần quyết tâm của toàn Đảng, toàn dân.',
      action: 'Sang phần ôn tập',
      notes: ['Tóm tắt bằng một câu.', 'Chuyển sang trò chơi ôn tập.', 'Khoảng 30 giây.'],
      cite: 'Giáo trình tr.111–112'
    }
  ],

  /* Trò chơi ôn tập: ba vòng (ghép cặp, điền khuyết, sắp xếp). */
  review: {
    title: 'Ôn lại qua ba vòng chơi',
    rounds: ['Ghép cặp', 'Điền khuyết', 'Sắp xếp'],
    match: {
      title: 'Ghép mốc với nội dung',
      how: 'Bấm một mục ở cột trái, rồi bấm nội dung tương ứng ở cột phải.',
      pairs: [
        ['Cương lĩnh năm 1930', 'Sau cách mạng dân tộc dân chủ nhân dân sẽ tiến lên chủ nghĩa xã hội'],
        ['Đại hội IX', 'Làm rõ nghĩa của quá độ bỏ qua chế độ tư bản chủ nghĩa'],
        ['Cương lĩnh năm 1991', 'Sáu đặc trưng và bảy phương hướng'],
        ['Cương lĩnh bổ sung 2011', 'Tám đặc trưng, tám phương hướng, tám mối quan hệ lớn'],
        ['Đại hội XIII', 'Mục tiêu 2025, 2030, 2045 và 12 định hướng'],
        ['Phân phối trong thời kỳ quá độ', 'Phân phối theo lao động vẫn là chủ đạo']
      ]
    },
    cloze: {
      title: 'Điền từ còn thiếu',
      how: 'Bấm vào chỗ trống, rồi bấm từ phù hợp ở bên dưới. Bấm “Kiểm tra” khi điền xong.',
      bank: ['thống trị', 'thành phần', 'lao động', 'gián tiếp', 'chất', 'trực tiếp'],
      items: [
        { before: 'Bỏ qua chế độ tư bản chủ nghĩa là bỏ qua việc xác lập vị trí ', after: ' của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa.', answer: 'thống trị' },
        { before: 'Thời kỳ quá độ ở nước ta có nhiều hình thức sở hữu, nhiều ', after: ' kinh tế.', answer: 'thành phần' },
        { before: 'Phân phối theo ', after: ' vẫn là chủ đạo trong thời kỳ quá độ.', answer: 'lao động' },
        { before: 'Việt Nam đi theo con đường quá độ ', after: ' vì chưa qua chủ nghĩa tư bản phát triển.', answer: 'gián tiếp' },
        { before: 'Quá độ tạo ra sự biến đổi về ', after: ' của xã hội trên tất cả các lĩnh vực.', answer: 'chất' }
      ]
    },
    order: {
      title: 'Xếp theo thứ tự thời gian',
      how: 'Bấm lần lượt từ mốc xảy ra sớm nhất đến mốc muộn nhất.',
      items: [
        'Sau cách mạng dân tộc dân chủ nhân dân sẽ tiến lên chủ nghĩa xã hội',
        'Nhận thức về chủ nghĩa xã hội mới dừng ở mức định hướng',
        'Sáu đặc trưng của chủ nghĩa xã hội',
        'Tám đặc trưng của chủ nghĩa xã hội',
        'Mục tiêu đến 2025, 2030, 2045'
      ],
      reveal: ['1930', '1976', '1991', '2011', '2021']
    },
    endTitle: 'Xong ba vòng.',
    endAction: 'Sang phần hỏi đáp'
  },

  /* Hỏi đáp: ba câu hỏi ôn tập cuối chương và các câu hỏi dễ gặp. */
  qa: {
    title: 'Hỏi đáp',
    exam: {
      title: 'Ba câu hỏi cuối Chương 3',
      items: [
        ['Phân tích điều kiện ra đời và những đặc trưng của chủ nghĩa xã hội. Liên hệ thực tiễn Việt Nam?',
          'Điều kiện kinh tế: lực lượng sản xuất xã hội hóa cao mâu thuẫn với quan hệ sản xuất tư nhân tư bản chủ nghĩa. Điều kiện chính trị – xã hội: giai cấp công nhân đối lập giai cấp tư sản, trưởng thành và có Đảng Cộng sản lãnh đạo. Đặc trưng: giải phóng con người; kinh tế phát triển cao, công hữu về tư liệu sản xuất chủ yếu; nhân dân lao động làm chủ; nhà nước kiểu mới; văn hóa phát triển cao; bình đẳng giữa các dân tộc, hữu nghị với các nước. Liên hệ: tám đặc trưng của chủ nghĩa xã hội Việt Nam.'],
        ['Phân tích tính tất yếu, đặc điểm của thời kỳ quá độ lên chủ nghĩa xã hội. Liên hệ thực tiễn ở Việt Nam?',
          'Tính tất yếu: giữa chủ nghĩa tư bản và chủ nghĩa cộng sản có một thời kỳ cải biến cách mạng (C. Mác); cần thời gian để cải tạo xã hội cũ, xây dựng xã hội mới. Hai loại quá độ: trực tiếp và gián tiếp. Đặc điểm: kinh tế nhiều thành phần (V.I. Lênin nêu năm thành phần); chính trị có chuyên chính vô sản; tư tưởng – văn hóa có nhiều tư tưởng cùng tồn tại; xã hội còn nhiều giai cấp, tầng lớp vừa hợp tác vừa đấu tranh. Liên hệ: Việt Nam quá độ gián tiếp, bỏ qua chế độ tư bản chủ nghĩa.'],
        ['Phân tích luận điểm của Đảng Cộng sản Việt Nam về con đường đi lên chủ nghĩa xã hội của nước ta là sự phát triển quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa?',
          'Đây là lựa chọn dứt khoát và đúng đắn của Đảng: đáp ứng nguyện vọng thiết tha của dân tộc, phản ánh xu thế của thời đại, phù hợp quan điểm của chủ nghĩa Mác – Lênin. Bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa, nhưng tiếp thu thành tựu nhân loại. Gồm bốn nội dung: tất yếu khách quan; bỏ qua sự thống trị của tư bản; kế thừa thành tựu nhân loại; biến đổi về chất, lâu dài và nhiều chặng.']
      ]
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
          'Từ Cương lĩnh năm 1930: sau khi hoàn thành cách mạng dân tộc dân chủ nhân dân sẽ tiến lên chủ nghĩa xã hội. Công cuộc đổi mới bắt đầu từ Đại hội VI năm 1986.']
      ]
    }
  }
};

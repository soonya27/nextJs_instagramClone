import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
    },
});

export async function sendEmail(email: string) {
    const mailData = {
        to: email,
        subject: `${email} Welcome to Instagram Clone Page! `,
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="text-align: center; color: #333;">Instagram Clone Coding Page에 오신 것을 진심으로 환영합니다!</h1>
                <p style="margin-bottom: 10px; line-height: 1.5; color: #555;">인스타그램 클론페이지를 통해 이미지와 텍스트를 공유할 수 있습니다.</p>
                <p style="margin-bottom: 10px; line-height: 1.5; color: #555;">여러분의 구글 계정과 업로드한 데이터는 상업적 목적이 아니라 포트폴리오 용도로만 사용될 것을 알려드립니다.</p>
                <p style="margin-bottom: 10px; line-height: 1.5; color: #555;">(Your Google account and uploaded data will only be used for portfolio purposes, not for commercial use.)</p>

        
                <div style="margin-top: 20px; text-align: center; display:flex;">
                    <img src="cid:profile" style="width:30%;" />
                    <div style="width:70%;">
                        <p style="margin-top: 20px; margin-bottom: 5px; line-height: 1.5; color: #555;">관련 문의는 <a href="mailto:psykor48@gmail.com" style="color: #007bff; text-decoration: none;">psykor48@gmail.com</a>로 보내주세요.</p>
                        <p style="margin: 5px; line-height: 1.5; color: #555;">GitHub: <a href="https://github.com/soonya27" target="_blank" style="color: #007bff; text-decoration: none;">https://github.com/soonya27</a></p>
                        <p style="margin: 5px; line-height: 1.5; color: #555;">블로그: <a href="https://myblog-eta-azure.vercel.app/" target="_blank" style="color: #007bff; text-decoration: none;">https://myblog-eta-azure.vercel.app/</a></p>
                    </div>
                </div>
            </div>
        </div>
        `,
        attachments: [
            {
                filename: "sub_bg.jpg",
                path: "public/images/profile_imge.jpg",
                cid: "profile"
            }
        ]
    }
    return transporter.sendMail(mailData);
}
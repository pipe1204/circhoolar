import { CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="flex-start flex-col paddings xl:mx-20 my-16 text-light-white">
      <CardTitle className="text-light-white mb-4 text-2xl xl:text-4xl">
        Terms of Service
      </CardTitle>
      <div className="flex flex-col gap-y-4">
        <p>
          These Terms of Service (“Terms”) govern your use of the websites and
          services (collectively, the “Services”) provided by Circhoolar (as
          defined below).
        </p>
        <h1 className="text-xl font-semibold">1. General</h1>
        <p>
          These Terms apply to all users of the Services, including without
          limitation users who are sellers, buyers, schools, or contributors of
          content, information and other materials. If you are entering into
          this agreement for and on behalf of a business entity, and the term
          “you” in this agreement shall mean the business entity on whose behalf
          you are using the Services, unless the context does not permit.
        </p>
        <p>
          These Terms are between you and Circhoolar Pte. Ltd or between you and
          any different service provider identified for a particular Service.
          For ease of reference, each of Circhoolar Pte. Ltd. and its
          subsidiaries are referred to in these Terms as “Circhoolar”.
        </p>
        <p>
          By using the Services in any manner, including but not limited to
          visiting or browsing the Services, you agree to observe and be bound
          by these Terms and the additional terms and conditions and policies
          referenced herein and/or available by hyperlink.
        </p>
        <p>
          Circhoolar reserves the right to change or modify these Terms at any
          time. You will be deemed to have agreed to the amended Terms by your
          continued use of the Services following the date on which the amended
          Terms are posted here.
        </p>
        <h1 className="text-xl font-semibold">2. Use of the Services</h1>
        <p>
          Subject to your compliance with these Terms, Circhoolar grants you a
          limited, non-exclusive, revocable (with or without cause),
          non-transferable right and license to use the Services.
        </p>
        <p>
          You shall use the Services in accordance with these Terms and shall
          not:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            Upload or communicate any Content (as defined below) that violates
            or infringes another party’s rights of publicity, privacy,
            copyright, trademark or any other intellectual property right.
          </li>
          <li className="mb-2">
            Copy, decompile, reverse engineer, disassemble, attempt to derive
            the source code of, decrypt, interfere with, or disrupt the
            integrity or the performance of the Services.
          </li>
          <li className="mb-2">
            Make any modification, adaptation, improvement, enhancement,
            translation or derivative work from the Services.
          </li>
          <li className="mb-2">
            Violate any applicable laws, rules or regulations in connection with
            your access or use of the Services.
          </li>
          <li className="mb-2">
            Use the Services in violation of or to circumvent any sanctions or
            embargo.
          </li>
          <li className="mb-2">
            Remove, alter or obscure any proprietary notice (including any
            notice of copyright and trademark) of Circhoolar or its affiliates,
            partners, suppliers or licensors.
          </li>
          <li className="mb-2">
            Use the Services for any purpose for which it is not designed or
            intended.
          </li>
          <li className="mb-2">
            Use the Services to create or promote a product, service or software
            that is, directly or indirectly, competitive with or in any way a
            substitute for the Services or any services, product or software
            offered by Circhoolar.
          </li>
          <li className="mb-2">
            Use any proprietary information or interfaces of Circhoolar or any
            other intellectual property of Circhoolar in the design,
            development, manufacture, licensing or distribution of any
            application, accessories or devices for use with the Services.
          </li>
          <li className="mb-2">
            Use the Services to send, post, or otherwise communicate any Content
            which is false, offensive, indecent, threatening, abusive,
            insulting, harassing, defamatory, libellous, deceptive, infringing,
            fraudulent, tortious, obscene, profane, invasive of another person’s
            privacy, or racially, ethnically or otherwise objectionable.
          </li>
          <li className="mb-2">
            Use the Services to send automated, unsolicited or unauthorised
            messages, advertising or promotional material or any junk mail, spam
            or chain letters.
          </li>
          <li className="mb-2">
            Upload to, or transmit through the Services any data, file, software
            or link that contains or redirects to a virus, Trojan horse, worm or
            other harmful components.
          </li>
          <li className="mb-2">
            Use any scraper, robot, bot, spider, crawler or any other automated
            device or means to access, acquire, copy or monitor any portion of
            the Services, or any data or content found or access through the
            Services.
          </li>
          <li className="mb-2">
            Collect any information in respect of other users without their
            consent.
          </li>
          <li className="mb-2">
            Commit any act to avoid paying any applicable fees and/or charges.
          </li>
          <li className="mb-2">
            Attempt to and/or engage in any activity or act that is intended to
            abuse, abuses or inappropriately manipulates any promotion, campaign
            and/or discount codes offered through the Services. Such act and
            activities include but are not limited to: creating fake or
            duplicate accounts; generating fake orders; buying and reselling
            your own inventory.
          </li>
          <li className="mb-2">
            Use the Services to upload, post, or otherwise communicate any
            Content which falsely represents that your listing(s) falls under a
            program offered by Circhoolar when it is not. This includes but is
            not limited to misrepresenting that a listing is a Certified listing
            under Circhoolar’s Certified Program.
          </li>
          <li className="mb-2">
            Authorise or encourage anyone to do any of the foregoing.
          </li>
        </ul>
        <p>
          Circhoolar reserves the right to claw back any cashbacks, prizes
          and/or amounts paid to you under any event, promotion, offers,
          campaign and any other activities and/or terminate or suspend your
          account, if you are subsequently found or suspected to be engaged in
          any activity or act that is in breach of these Terms, our guidelines,
          any additional terms and conditions and policies.
        </p>
        <h1 className="text-xl font-semibold">3. Account</h1>
        <p>
          You would need to have an account with Circhoolar (“Account”) in order
          to use some parts of the Services. When you create an Account, you
          represent and warrant that:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            If you are an individual, you are at least 18 years of age.
          </li>
          <li className="mb-2">
            If you are representing a company, organisation or any other legal
            entity (“Entity”), you have authority to bind the Entity to these
            Terms.
          </li>
          <li className="mb-2">
            You are capable of entering into and performing legally binding
            contracts under applicable law.
          </li>
          <li className="mb-2">
            All information which you provide is accurate, up to date, truthful
            and complete.
          </li>
        </ul>
        <p>
          If you are under 18 years of age, you may only use the Services with
          the consent of and under the supervision of your parent or legal
          guardian who shall be responsible for all your activities.
        </p>
        <p>
          You are responsible for all activities and transactions under your
          Account. We will not be responsible in any way if your password and/or
          Account are misappropriated or used by a third party. You, therefore
          agree to:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">Keep your password secure.</li>
          <li className="mb-2">
            Keep your account information up to date at all times.
          </li>
        </ul>
        <p>
          Comply with Circhoolar’s prevailing policies and guidelines (which
          form a part of these Terms) and all applicable laws with respect to
          your activities and the Content which you upload to the Services.
        </p>
        <p>
          Unless expressly permitted by Circhoolar and subject to these Terms
          and any other additional terms as Circhoolar determines, you shall not
          set up multiple Accounts. You shall not lend, transfer or sell your
          Account or user ID to another party and must not use another user's
          Account without their permission. To this end, Circhoolar reserves the
          right to suspend or terminate your Accounts and/or your access to the
          Services at any time, without advance notice to you.
        </p>
        <p>
          Circhoolar reserves the right to treat multiple Accounts set up by or
          on behalf of the same user, whether after obtaining Circhoolar’s
          authorization or not, as one. This includes the right to treat the
          funds held in multiple Accounts as one, including to debit any such
          Account to satisfy debts, payments and refunds under any other Account
          held by you or on your behalf. For instance, where you have engaged in
          a Prohibited Transaction using one of your multiple accounts,
          Circhoolar may use the funds in that account and/or any of your other
          accounts to reimburse a buyer up to the amount equivalent to monies
          the buyer paid in connection with that Prohibited Transaction.
        </p>
        <h1 className="text-xl font-semibold">4. Fees and Payments</h1>
        <p>
          Depending on the type and/or number of listings you choose to post and
          any additional services you may request in relation to your Account or
          listing, you may be charged selling fees, listing fees, quota fees,
          charged for the Circhoolar Coins you may purchase and/or fees and
          charges otherwise in relation to your Account or listing
          (collectively, the “Circhoolar Fees”).
        </p>
        <p>
          You may pay your Circhoolar Fees using a credit card, debit card,
          cheque or by way of telegraphic or other electronic means of transfer.
          You may also pay your Circhoolar Fees through any of the methods as
          may be made available on the Platforms or as may be notified to you
          from time to time.
        </p>
        <p>You acknowledge and agree that:</p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            in the event of a subscription or recurring payment, you shall
            ensure that all payments are made and cleared by your bank before
            each monthly and/or annual recurring payment is due. For payments by
            credit card, your credit card account must be in good standing and
            remain valid for the monthly/annual charge(s) to be debited
            successfully. In the event of an unsuccessful payment, your
            Circhoolar Subscription will automatically be suspended and/or
            terminated if payments are not received within ten (10) days from
            due date;
          </li>
          <li className="mb-2">
            If your credit card has expired, or if you wish to use a different
            credit card, please notify us promptly by sending an email to
            finance@circhoolar.com at least 14 days before your next
            subscription fee payment is due. Please indicate “Expiry/Change of
            CC details” at the subject header;
          </li>
          <li className="mb-2">
            save as set out in this Clause, all subscription fees, listing fees
            and/or other fees and charges paid by you to us with respect to your
            Account or otherwise for your access to and use of the Services, are
            non-refundable. For the avoidance of doubt, there will be no refunds
            of any Circhoolar Fees in the event that: (i) your Account is
            suspended or terminated due to a breach of these Terms; and/or (ii)
            any Content has been removed in accordance with these Terms;
          </li>
          <li className="mb-2">
            You shall make prompt payment of all Circhoolar Fees, in full before
            the due date stipulated by Circhoolar for such payment (where
            applicable) and in accordance with our payment instructions. In the
            event of late payment or non-payment of amounts due to Circhoolar,
            without prejudice to any other rights or remedies available to us,
            Circhoolar shall be entitled to: (i) terminate and/or suspend your
            Account and/or your access to the Services; and/or (ii) charge you a
            late payment fee on the overdue amount at the rate of 1.5% per
            month, or, if lower, the maximum rate allowed by applicable law. You
            shall pay such fees together with the overdue Circhoolar Fees and
            any legal fees and collection costs incurred by Circhoolar in
            collecting any past due amounts. This fee will be applied on the day
            after the payment due date and will applied each month until the
            overdue amount is paid;
          </li>
          <li className="mb-2">
            in the event your Account is suspended or terminated for any reason
            any amounts due on your Account will immediately become due and
            payable. Circhoolar reserves the right to immediately charge any
            amounts you have not previously disputed to the billing method that
            you are using and shall be entitled to terminate your Account,
            without prejudice to any other rights or remedies available to us;
            and
          </li>
          <li className="mb-2">
            you are responsible for collecting and paying any taxes associated
            with using and making sales through the Services. Depending on the
            tax legislation of your country of residence, goods and services tax
            or similar consumption tax might apply in addition to your fees.
          </li>
        </ul>
        <h1 className="text-xl font-semibold">7. Circhoolar is a Venue</h1>
        <p>
          The Services provide a venue for users to interact with each other,
          and to buy and sell items. Circhoolar does not pre-screen a user or
          the Content provided by a user, nor is Circhoolar directly involved in
          transactions between users save for transactions under Circhoolar
          Certified where Circhoolar is the seller and transactions under Sell
          to Circhoolar. Consequently, Circhoolar has no control over, and you
          agree that Circhoolar is not responsible or liable for, any of the
          following:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            The quality, safety, morality, legality or authenticity of any
            aspect of the items or services advertised and/or listed, and for
            items listed by a Circhoolar Certified Partner, the authenticity of
            such items.
          </li>
          <li className="mb-2">
            The truth or accuracy of the listings, the ability of sellers to
            sell items or the ability of buyers to pay for items.
          </li>
          <li className="mb-2">
            The true identity, age, nationality, or sense of humour of a user.
          </li>
          <li className="mb-2">Any Content posted by users.</li>
        </ul>
        <p>
          You are encouraged to use the features and functions available on the
          Services to communicate with other users and/or to find out more about
          an item which a user has put up for sale. However, please exercise
          common sense and good judgment in your interactions with other users.
          While Circhoolar endeavours to keep the Services safe for everyone,
          your use of the Services and your interactions with other users is
          entirely at your own risk.
        </p>
        <h1 className="text-xl font-semibold">8. Content</h1>
        <p>
          The Services allow users to create listings and/or share, post and/or
          communicate content, such as photos, videos, comments, data, text,
          links, product description, product specification and/or other
          information (“Content”).
        </p>
        <p>
          You retain ownership rights in the Content which you upload or share
          on the Services but you grant Circhoolar a worldwide, fully-paid,
          royalty-free, sub-licensable, and transferable licence to host, store,
          use, display, reproduce, modify, adapt, edit, publish and distribute
          such Content (subject to Circhoolar’s Privacy Policy) for the purpose
          of operating, developing, providing, promoting, and improving the
          Services and to research and develop new products and services.
        </p>
        <p>
          You understand and agree that you are solely responsible for the
          Content which you post or share on or through the Services and any
          loss or damage which you sustain as result of such Content is solely
          your responsibility.
        </p>
        <p>
          You acknowledge that Circhoolar does not pre-screen Content uploaded
          by users. Circhoolar shall have the right (but not the obligation) in
          its sole discretion to refuse, delete or move any Content that is
          available on the Services. Without limiting the foregoing, Circhoolar
          shall have the right to remove Content, without liability or the
          obligation to offer a refund, in any of the following events:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            If the Content is suspected to be / is in breach of these Terms.
          </li>
          <li className="mb-2">
            If Circhoolar has received a complaint or notice of infringement in
            respect of the Content.
          </li>
          <li className="mb-2">If the Content is otherwise objectionable.</li>
        </ul>
        <p>
          Circhoolar may also block Content and the delivery of a communication
          (including, without limitation, feedback, postings, messages and/or
          chats) to or from the Services as part of efforts to protect the
          Services or users, or to otherwise enforce these Terms.
        </p>
        <h1 className="text-xl font-semibold">
          9. Selling and Buying on Circhoolar
        </h1>
        <p>
          In using the Services to create a listing and offer an item for sale,
          post a job opening and/or offer a service (as the case may be), you
          agree to comply with the following:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            All items must comply with these Terms and Circhoolar's policies,
            which can be found
            <Link href={"/"} className="underline text-primary-purple">
              here.
            </Link>
          </li>
          <li className="mb-2">
            Our listing policy which is applicable to all categories except
            Property, Autos, Jobs and Services.
          </li>
          <li className="mb-2">
            You must provide a fair, accurate and complete information of each
            item, including your price for the item or whether it is free of
            cost.
          </li>
          <li className="mb-2">
            Your listing for an item may only include text, descriptions,
            graphics, images and other content relevant to the item. All Content
            contained in a listing must be true, complete, accurate and not
            misleading in any manner whatsoever.
          </li>
          <li className="mb-2">
            All items, job opening and/or offer of services must be listed in
            the appropriate category. All job listings must comply with all
            applicable laws, regulations, guidelines or policies and any
            notices, guidelines and/or policies issued by the Australian
            Goverment.
          </li>
          <li className="mb-2">
            Any links included in your listing leads to your personal or
            corporate website and must not include any links to third party
            websites.
          </li>
        </ul>
        <p>
          You acknowledge and agree that Circhoolar has no control over any
          website other than the Circhoolar website and shall not in any event
          be responsible or held liable for any expired job listing which
          appears on any website other than the Circhoolar website or any
          expired job listing which is retrieved by any search engine.
        </p>
        <p>
          Without prejudice to the rest of these Terms and Circhoolar’s
          policies, you warrant, in respect of each job opportunity, services
          and/or item which you offer for sale on the Services (as the case may
          be), that:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            You are the owner of the item, and the item is not stolen.
          </li>
          <li className="mb-2">
            The item is not counterfeit and does not infringe upon any third
            party's copyright, patent, trademark, trade secret or other
            proprietary or intellectual property rights.
          </li>
          <li className="mb-2">
            The sale of the item complies with all laws and regulations which
            apply to that item.
          </li>
          <li className="mb-2">
            The item is not dangerous, hazardous or subject to a recall by a
            government or manufacturer.
          </li>
          <li className="mb-2">
            All selection criteria stated in a service listing are clear,
            objective and relevant and does not refer to age, race, language,
            gender, marital status and religion, except where it is a Specific
            Attribute.
          </li>
          <li className="mb-2">
            The Content in any listing does not infringe or violate any
            applicable laws and regulations, the intellectual property rights or
            proprietary rights of a third party.
          </li>
        </ul>
        <p>All offers made and accepted through the Services are binding.</p>
        <p>If you are a seller who has accepted a buyer’s offer for an item:</p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            You agree to ship the item or otherwise complete the transaction
            with the buyer in a prompt manner unless there is an exceptional
            circumstance, for instance, if the buyer fails to meet the terms of
            your listing (such as payment method), or you cannot authenticate
            the buyer's identity.
          </li>
          <li className="mb-2">
            You may charge reasonable shipping and handling fees to cover the
            costs for packaging and mailing the item. However, you must not
            charge excessive shipping fees or otherwise avoid fees.
          </li>
          <li className="mb-2">
            You may not alter the item's price after a sale, or misrepresent the
            item's location and price.
          </li>
        </ul>
        <p>
          If you are a buyer whose offer for an item has been accepted by a
          seller, you agree to make prompt payment to the seller for the item,
          unless there is an exceptional circumstance, for instance, if you
          cannot authenticate the seller’s identity.
        </p>
        <p>
          In communicating with a user through the Services for the offering of
          or acceptance of a service listing and/or services or purchase or sale
          of an item (each, a “Transaction”), you may obtain personal
          information of that user, such as their email address, phone number
          and mailing address. Without obtaining prior permission of the user,
          you shall use such information solely for the purpose of the
          Transaction.
        </p>
        <p>
          Notwithstanding the foregoing, where Circhoolar is not involved in a
          Transaction which is solely between users, Circhoolar cannot ensure
          that a user (whether as a buyer or seller) would follow through and
          complete a Transaction.
        </p>
        <h1 className="text-xl font-semibold">
          10. Listings and Agreeing to exchange
        </h1>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            Any user may post a listing at any time, through the functionality
            in the platform.
          </li>
          <li className="mb-2">
            All listings must comply with the Posting Policies and Circhoolar
            reserves the right to not publish or remove at any time any listing
            which violates the Posting Policies.
          </li>
          <li className="mb-2">
            Any user may, in its absolute discretion, engage with any listing,
            which is not a commitment to proceed with the offer in the listing.
          </li>
          <li className="mb-2">
            You agree to only use the Platform’s messaging functionality to
            communicate with other users, and to use that functionality.
          </li>
          <li className="mb-2">
            You agree to personally post, and respond to inquiries about,
            listings. You must not use any automated tools, programs or
            applications to provide automated responses on your behalf (unless
            any such tools, programs or applications are provided to you as part
            of the Platform).
          </li>
          <li className="mb-2">
            If two users agree to the terms of a listing (as amended by any
            related communications through the Platform), they may use the
            functionality on the Platform to agree to exchange the Goods or
            Services, or perform the Job, for a fee as agreed between them (in
            accordance with all applicable laws) (Exchange).
          </li>
          <li className="mb-2">
            Depending on the nature of the listing, additional terms set out in
            the following clauses will apply.
          </li>
        </ul>
        <h1 className="text-xl font-semibold">
          11. Specific Terms for Services
        </h1>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            If a listing offers the performance of Services, this clause 11
            applies to those Services.
          </li>
          <li className="mb-2">
            The Provider represents and warrants that it has the appropriate
            skills, qualifications, and experience to perform the Services
            described in the listing and otherwise communicated to the Consumer.
          </li>
          <p>
            If a Provider performs Services, it must ensure that the Services:
          </p>
          <ul className="list-disc list-inside mx-10">
            <li className="mb-2">
              are of an acceptable standard with regard to the nature of the
              Services as described by the Provider;
            </li>
            <li className="mb-2">are performed with due care and skill; and</li>
            <li className="mb-2">
              meet all representations made to the Consumer during Exchange.
            </li>
          </ul>
          <li className="mb-2">
            The Consumer acknowledges that it is responsible for reading the
            Services description and satisfying itself that the Services as
            described will meet the Consumer’s requirements prior to agreeing to
            Exchange.
          </li>
          <li className="mb-2">
            The Consumer is responsible for ensuring the location for
            performance of the Services is made accessible to the Provider on
            the agreed date, at the agreed time, for performance.
          </li>
          <li className="mb-2">
            The Provider is responsible for ensuring compliance with work health
            and safety procedures when performing the Services, including
            ensuring they hold workers’ compensation insurance, professional
            indemnity and worker’s compensation insurance as applicable to the
            Services.
          </li>
          <li className="mb-2">
            Consumers are strongly encouraged to hold home and contents
            insurance and public liability insurance if applicable to the
            Services.
          </li>
        </ul>
        <h1 className="text-xl font-semibold">12. Specific Terms for Goods</h1>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            If a listing offers Goods for sale or to give away for free, this
            clause 12 applies to those Goods.
          </li>
        </ul>
        <p>The Provider represents and warrants that:</p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            they are the sole beneficial owner of the Goods, with title lawfully
            obtained, free from any security interests, finance, or other
            encumbrances; and
          </li>
          <li className="mb-2">
            any defects (including minor defects) are clearly and accurately
            stated in the description of the Goods and are not otherwise
            disguised or overlooked in the listing.
          </li>
        </ul>
        <p>
          The Provider acknowledges and agrees that Consumers have rights under
          the Consumer Laws, which to the extent applicable to the Provider and
          Consumer, apply to second-hand goods to the extent reasonable with
          regard to their age, description and price. This includes that the
          Goods are of acceptable quality, will match its description and be fit
          for purpose. The Provider must have regard to these guarantees when
          describing the quality, condition, and functionality, and setting the
          price, of the Goods and must not attempt to exclude, restrict or
          modify any guarantees that are applicable under the Consumer Laws.
        </p>
        <p className="font-semibold">Consumer Responsibilities</p>
        <p>
          The Consumer acknowledges that Goods may be second hand if described
          as such, and the Consumer is responsible for reading the description
          of the Goods and satisfying itself that the Goods as described will
          meet the Consumer’s requirements prior to agreeing to Exchange,
          including with regard to its age, description and price.
        </p>
        <p className="font-semibold">Delivery</p>
        <p>
          For all Exchanges, Circhoolar strongly encourages you to inspect the
          Goods prior to making payment.
        </p>
        <p>
          If Exchange will occur in person, users are encouraged to ensure their
          safety by:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            verifying the identity of the Seller prior to meeting in person;
          </li>
          <li className="mb-2">
            selecting a public place to meet, during daylight hours; and
          </li>
          <li className="mb-2">never allowing anyone to enter your home.</li>
        </ul>
        <p>
          Circhoolar strongly encourages users to be cautious when giving their
          address to Providers and use secure, third-party technology to arrange
          delivery of Goods.
        </p>
        <p>
          Title to the Goods will pass to the user on payment of the Exchange
          Fee. Risk of loss or damage to the Goods will pass to the Consumer on
          delivery.
        </p>
        <p>
          If the delivery issue cannot be resolved, and the Provider cannot
          provide evidence that the Goods were shipped, the Provider must refund
          the Consumer the amount paid to the Provider for the Goods including
          shipping.
        </p>
        <p>
          If the Provider can provide evidence that the Goods were shipped, the
          Provider must take all steps necessary to ensure the third party
          courier delivers the Goods or refunds the amount lost to the Consumer.
        </p>
        <p>
          If the Provider can evidence that the Goods were delivered, the Goods
          will be deemed delivered.
        </p>
        <p>
          Claims for loss of or damage to Products in transit must be made
          against the carrier by the Provider.
        </p>
        <h1 className="text-xl font-semibold">13. User Content</h1>
        <p className="font-semibold">Ownership of Content & Related IP</p>
        <p>
          Your Intellectual Property Rights in any Goods or Services you offer
          remain yours.
        </p>
        <p>
          You acknowledge that all listings, data, text, messages and other
          materials, whether publicly posted or privately transmitted, you share
          through the Platform or otherwise with Circhoolar or another User
          (Content) is immediately assigned to and owned by Circhoolar.
        </p>
        <p>
          If you share any Content on the Platform which contains any
          Intellectual Property Rights, for example an image, you represent and
          warrant that you are either the owner of those Intellectual Property
          Rights or are licensed to share that Content both on Circhoolar’s
          website and publicly for commercial purposes. You indemnify Circhoolar
          for any claims that any Content you post in a Listing, or your
          dealings with any Goods or Services, infringes any third party
          Intellectual Property Rights.
        </p>
        <p className="font-semibold">Responsibility for Content</p>
        <p>
          The accuracy and completeness of the Content is the sole
          responsibility of the person providing the Content.
        </p>
        <p>
          Circhoolar does not control the Content posted via the Platform and,
          as such, does not guarantee the accuracy, completeness, lawfulness or
          usefulness of such Content. This means that you, and not Circhoolar,
          are entirely responsible for any actions you take in reliance on
          Content. You agree that you must evaluate, and bear all risks
          associated with, the use of any Content, including any reliance on the
          accuracy, completeness, lawfulness and usefulness of such Content.
        </p>
        <p className="font-semibold">Prohibited Content</p>
        <p>
          Without limiting or otherwise affecting the Posting Policies, you
          acknowledge and agree that you must not use the Platform to, on public
          or private pages:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            upload or download any Content in a manner that is inconsistent with
            the platform licence and restrictions in clause 14;
          </li>
          <li className="mb-2">
            upload any Content which is inconsistent or noncompliant with the
            Posting Policies or any applicable laws, including the Employment
            Laws, Consumer Laws and Privacy Laws
          </li>
          <li className="mb-2">
            upload, post or otherwise transmit any Content that is intended to
            further any political, legal, social or economic agenda which
            Circhoolar deems, in its discretion, to be inconsistent with the
            spirit or values of the Posting Policies, its business objectives or
            the common good of its community of users;
          </li>
          <li className="mb-2">
            solicit or provide any Goods, Services or Jobs which are illegal in
            the jurisdiction in which you reside, including in relation to
            pornography, prostitution, or prohibited or restricted substances;
          </li>
          <li className="mb-2">
            upload, post, or otherwise transmit any Content that is unlawful,
            harmful, threatening, abusive, harassing, tortuous, defamatory,
            vulgar, obscene, libellous, invasive of another’s privacy, hateful,
            or racially, ethnically or otherwise objectionable;
          </li>
          <li className="mb-2">
            forge headers or otherwise manipulate identifiers in order to
            disguise the origin of any Content transmitted through the Platform;
          </li>
          <li className="mb-2">
            upload, post, or otherwise transmit any Content that you do not have
            a right to transmit under any law or under contractual or fiduciary
            relationship (such as insider, proprietary or confidential
            information learned or disclosed as part of employment);
          </li>
          <li className="mb-2">
            upload, post, or otherwise transmit any material that contains
            software viruses or any other computer code, files or programs
            designed to interrupt, damage, destroy or limit the functionality of
            any computer software or hardware or telecommunications equipment,
            including any automated posting software or bots to make automatic
            communications on the Platform;
          </li>
          <li className="mb-2">
            interfere with or disrupt Platform or servers or networks connected
            to Platform, or disobey any requirements, procedures, policies or
            regulations of networks connected to Platform;
          </li>
          <li className="mb-2">
            upload, post or otherwise transmit any Content that infringes any,
            trademark, copyright or other proprietary rights of any party;
          </li>
          <li className="mb-2">
            upload, post or otherwise transmit any unsolicited or unauthorised
            advertising, promotional materials, junk mail, spam, chain letters,
            pyramid schemes;
          </li>
          <li className="mb-2">
            publish, republish, transmit, display, or otherwise make available
            any content from the Website (whether online or otherwise); or
          </li>
          <li className="mb-2">
            intentionally or unintentionally violate any applicable law or
            regulation including, but not limited to, regulations promulgated by
            any securities exchange.
          </li>
        </ul>
        <p>
          You acknowledge that Circhoolar does not pre-screen Content, but that
          Circhoolar and its agents will have the right (but not the obligation)
          in their sole discretion to refuse or move any Content that is
          available via Platform.
        </p>
        <h1 className="text-xl font-semibold">
          13. Privacy and User Communications
        </h1>
        <p>
          We will abide by, and you agree to, our{""}
          <Link
            href={"/privacy-policy"}
            className="underline text-primary-purple"
          >
            Privacy Policy
          </Link>
          , which can be accessed via the link at the start of these Terms and
          may be updated from time to time by written notice to you.
        </p>
        <p>
          You must not share any Content with any other user, including in any
          listing, which is not necessary to understand or discuss the Listing.
          You must never provide credit card details or bank details to any
          other user. Any information you provide to another user is done so at
          your own risk.
        </p>
        <p>
          However, all users must take all steps necessary to protect from
          misuse or distribution the information you receive from other users.
          If Circhoolar becomes aware of any User misusing or distributing
          information of another User, Circhoolar will investigate and terminate
          the user’s Account.
        </p>
        <p>
          Without limiting our
          <Link
            href={"/privacy-policy"}
            className="underline text-primary-purple"
          >
            Privacy Policy
          </Link>
          , which will prevail to the extent of any inconsistency with this
          clause, you agree that Circhoolar may monitor, use, access, store, and
          disclose your Content, including your communications with any other
          user:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            for the purpose of providing the Platform to you in an efficient
            manner;
          </li>
          <li className="mb-2">
            for the purpose of ensuring your compliance with this Agreement;
          </li>
          <li className="mb-2">
            for the purpose of properly administering your Account in accordance
            with the standard operating procedures of Circhoolar or its
            affiliated or subsidiary companies or agents; and
          </li>
          <li className="mb-2">
            if required to do so by law or in the good faith belief that any
            such access, preservation or disclosure is reasonably necessary to:
          </li>
          <ol className="list-decimal list-inside mx-10">
            <li className="mb-2">comply with legal process;</li>
            <li className="mb-2">enforce the Terms;</li>
            <li className="mb-2">
              respond to claims that any Content violates the rights of
              third-parties;
            </li>
            <li className="mb-2">
              respond to your requests for customer service; or
            </li>
            <li className="mb-2">
              protect the rights, property, or personal safety of Circhoolar,
              its Users and the public at large.
            </li>
          </ol>
        </ul>
        <p>
          You acknowledge that Circhoolar enters into partnerships with external
          organisations and companies who, on occasion will convey their
          messages or offerings (for commercial purposes or otherwise) to you in
          the form of advertisements via our communications, web, mobile or
          social media platforms.
        </p>
        <p>
          <span className="font-semibold">
            Retention and deletion of Account / Content
          </span>
          - We may retain your Content for such period we reasonably consider
          necessary for our legitimate business purposes, including legal
          reasons. However, unless your Account has been terminated in
          accordance with clause 21(b), we grant you the right to request your
          Account be deleted (where some Content may be retained). If you want
          to ask us to delete your Account, you may contact us using the
          functionality at the ends of these Terms. We will use our best
          endeavours to action any such request within a reasonable timeframe.
        </p>
        <h1 className="text-xl font-semibold">
          14. Platform License And Intelectual Property Restrictions
        </h1>
        <p>
          While ever you continue to meet your obligations under this Agreement,
          we grant to you a non-exclusive, non-transferable, royalty-free,
          revocable licence to use the Platform for the sole purpose of engaging
          in legitimate and lawful Exchanges.
        </p>
        <p>
          You acknowledge and agree that the Platform contains Intellectual
          Property Rights and confidential information that is owned by
          Circhoolar in accordance with applicable laws and registration bodies,
          including the underlying source code. Nothing in this Agreement
          transfers any Intellectual Property Rights in the Platform to you. Any
          use of the Platform by you in breach of the Licence will be a breach
          of our Intellectual Property Rights for which you will be liable to us
          in damages and consequential damages.
        </p>
        <p>You must not:</p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            copy, scrape or data-mine the whole or any part of the Platform,
            including any screen or data scraping or other methods of taking any
            content from the Platform or any API;
          </li>
          <li className="mb-2">
            manipulate or take advantage of any vulnerability in the Platform
            for your own commercial gain or any other purpose;
          </li>
          <li className="mb-2">
            modify, merge, integrate or combine the whole or any part of the
            Platform or system with any other software, program or application;
          </li>
          <li className="mb-2">
            attempt to assign, transfer, distribute, sell, lease, rent,
            sub-license, charge or otherwise deal in or encumber the Platform;
          </li>
          <li className="mb-2">
            adapt, translate, reverse engineer, decompile or disassemble the
            whole or any part of the Platform; or
          </li>
          <li className="mb-2">
            use any automated tools, hacks, scripts, programs or applications
            that are designed to access any data, modify or interfere with the
            functioning of the Platform, or interact with communications from
            the Platform, for any purpose.
          </li>
        </ul>
        <p>
          You agree that any advertisements presented to you through the
          Platform are protected by copyrights, trademarks, service marks,
          patents or other proprietary rights and laws.
        </p>
        <h1 className="text-xl font-semibold">15. Disclaimers</h1>
        <p>
          Circhoolar may provide, or third parties may provide, links to third
          party sites or resources. Because Circhoolar has no control over such
          sites and resources, you acknowledge and agree that Circhoolar is not
          responsible for the availability of such external sites or resources.
          Circhoolar does not endorse and is not responsible or liable for any
          content, advertising, products, or other materials on or available
          from such sites or resources. Circhoolar will not be responsible or
          liable, directly or indirectly, for any damage or loss caused or
          alleged to be caused by or in connection with use of or reliance on
          any such Content, goods or services available on or through any such
          site or resource.
        </p>
        <p>
          Your use of the Platform is at your sole risk. The Platform, including
          the User community, is provided on an “as is” and “as available”
          basis. You must make all reasonable inquiries to determine the
          legitimacy of a user and accuracy of a listing. You acknowledge that
          by using the Platform, under no circumstances will Circhoolar be
          liable in any way for any Listing, including, but not limited to, any
          errors or omissions or misleading information in any Listing, or for
          any loss or damage of any kind incurred as a result of the use of your
          reliance on any listing or performance or receipt of any Exchange.
        </p>
        <p>Circhoolar makes no warranty or representation that:</p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">the Platform will meet your requirements;</li>
          <li className="mb-2">
            the Platform will be uninterrupted, timely, secure, or error-free;
          </li>
          <li className="mb-2">
            the quality of any products, services, information, or other
            material purchased or obtained by you through Circhoolar will meet
            your expectations; or
          </li>
          <li className="mb-2">
            any errors in the underlying source code will be corrected.
          </li>
        </ul>
        <p>
          Any material downloaded or otherwise obtained through the use of
          Platform is done at your own discretion and risk that you will be
          solely responsible for any damage to your computer system or loss of
          data that results from the download of any such material.
        </p>
        <p>
          Nothing in these terms is intended to exclude or displace any
          guarantees or warranties provided to you as a consumer of the Platform
          or any Goods or Services under the Consumer Law. Under the Consumer
          Law, you may be entitled to a repair or replacement service, or other
          similar rights in accordance with the Consumer Law from time to time.
        </p>
        <h1 className="text-xl font-semibold">16. Issues And Disputes</h1>
        <p className="font-semibold">Issues with the Platform</p>
        <p>
          If you encounter any issues with the Platform, please contact us
          through the functionality at the bottom of this page. We will
          endeavour to resolve your issue within 5 weekdays. If we are unable to
          resolve your issue, your rights and our liability is limited in
          accordance with clause 17.
        </p>
        <p className="font-semibold">Disputes with other Users</p>
        <p>
          Any issues or disputes about a listing or exchange, including
          services, is an issue between the Provider and the Consumer, or seller
          and buyer (Disputing Users).
        </p>
        <p>
          To the maximum extent permitted at law, any issues or disputes about
          listings or exchanges, including services, are not an issue or dispute
          with Circhoolar.
        </p>
        <p>
          The Disputing users must, in good faith, seek to efficiently and cost
          effectively resolve the issue in a manner that is objectively fair to
          both parties in the circumstances. The users are encouraged to seek
          independent legal advice (at their own cost) if the issue is
          significant or otherwise is not progressing towards independent
          resolution.
        </p>
        <p>
          All users agree to refrain from initiating formal legal proceedings
          until any issue that cannot be resolved day to day has been discussed
          at mediation and the parties have made a genuine effort at resolving
          the issue in good faith.
        </p>
        <h1 className="text-xl font-semibold">
          17. Liability And Indemnity Of Circhoolar
        </h1>
        <p>
          To the maximum extent permitted by law, under no circumstances will
          Circhoolar be liable to you for any incidental, special or
          consequential loss or damages, or damages for loss of data, damage to
          reputation, business or business opportunity, goodwill, anticipated
          savings, profits or revenue arising under or in connection with the
          Platform, this Agreement or any listings, exchange, Goods or Services
          or incidental activities (except to the extent this liability cannot
          be excluded under the Competition and Consumer Act 2010 (Cth)).
        </p>
        <p>
          If Circhoolar is liable to you (whether in contract, indemnity, tort,
          statute or equity), you acknowledge and agree that Circhoolar’s
          liability in aggregate for all claims by you or third parties who
          encounter related activities or goods through you, for loss or damage
          of any kind arising from or relating in any way to this Agreement, the
          Platform or any Listing, Exchange, Goods or Services, to:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            if the liability relates to an Exchange - the amount paid for the
            relevant Goods or Services that are the subject of the Exchange
            giving rise to the liability – where such amount will only be paid
            to the party found to have suffered the loss through the dispute
            procedures in clause 16, be it the Consumer or Provider (but not
            both); or
          </li>
          <li className="mb-2">
            if the liability relates to the Platform - the amount paid to
            Circhoolar by you for use of the Platform in the 12 months preceding
            the event giving rise to the liability, and if that amount is less
            than $100, then $100.
          </li>
        </ul>
        <p>
          You indemnify Circhoolar in respect of all liability for any claim(s)
          by any User or person (including any third party who encounters the
          Listing, Services, Goods or Job through you or the initial User)
          arising from your or your representatives’:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">
            breach of any third party property rights or intellectual property
            rights;
          </li>
          <li className="mb-2">breach of any term of this Agreement;</li>
          <li className="mb-2">
            breach of any applicable law (including the Consumer Laws and
            Privacy Laws) or the Posting Policies;
          </li>
          <li className="mb-2">
            inquiry, issue or dispute with any other user;
          </li>
          <li className="mb-2">
            personal injury or death arising from any Goods
          </li>
          <li className="mb-2">use of the Platform; or</li>
          <li className="mb-2">
            negligent, wilful, fraudulent or criminal act or omission, except to
            the extent Circhoolar caused or contributed to any such claims
            through its own wilfully reckless or negligent act or omission and
            Circhoolar ought reasonably to be liable for a portion of the claim
            (in which case Circhoolar’s liability is capped in accordance with
            clause 17). The parties agree that Circhoolar provides the Platform
            (as is, and as adjusted from time to time) based on the relationship
            structure, and Circhoolar providing the Platform (as is, and as
            adjusted from time to time) will not be considered a cause or
            contribution of Circhoolar to any claim.
          </li>
        </ul>
        <h1 className="text-xl font-semibold">
          18. Reporting Misused And Our Right To Revoke Your Account
        </h1>
        <p>
          If you have any reason to suspect any other user is using the Platform
          in breach of any part of this Agreement, we ask that you notify
          Circhoolar at the relevant link below as soon as you become aware of
          the breach or misuse, and provide us with as much information as
          possible.
        </p>
        <p>
          If Circhoolar knows or reasonably suspects that you are or may be in
          breach of any clause of this Agreement – including any part of the
          Posting Policies - Circhoolar may, in its absolute discretion and
          without explanation, right of appeal or liability to you, do any or
          all of the following:
        </p>
        <ul className="list-disc list-inside mx-10">
          <li className="mb-2">immediately terminate your Account;</li>
          <li className="mb-2">
            prohibit you from further use of the Platform for any period deemed
            appropriate in Circhoolar’s absolute discretion including forever;
            or
          </li>
          <li className="mb-2">
            report the breach (along with applicable evidence) to any relevant
            law enforcement authority, if applicable to the nature of the
            breach.
          </li>
        </ul>
        <p>
          You acknowledge Circhoolar may, if required or otherwise in its
          discretion, cooperate in any proceedings relating to your misuse of
          the Platform or breach of this Agreement, including where Users are in
          dispute in accordance with clause 16. Circhoolar may decline to
          provide any information or data in accordance with its{" "}
          <Link
            href={"/privacy-p[olicy"}
            className="underline text-primary-purple"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <h1 className="text-xl font-semibold">
          19. Miscellaneous Interpretation Provisions
        </h1>
        <p>
          This Agreement is to be interpreted in accordance with the laws of
          victoria and the parties submit to the exclusive jurisdiction of
          victoria. The parties submit to the exclusive jurisdiction of the
          courts of Victoria and competent courts of appeal from them.
        </p>
        <p>
          If any clause of this agreement is unenforceable at law, that clause
          is to be severed to the narrowest extent possible to overcome the
          enforceability issue, and the other terms of this agreement will
          continue to apply with full force and effect.
        </p>
        <p>
          Any failure of a party to enforce a right under this agreement will
          not constitute a waiver of that party’s right to exercise that right
          in future.
        </p>
        <p>
          This Agreement is entered into on the day and at the time you agree to
          it in accordance with clause 3, and will continue to apply whenever
          you access the Platform unless and until these terms are updated by
          us.
        </p>
        <p>
          We may update this Agreement from time to time by written notice to
          you.
        </p>
      </div>
    </section>
  );
};

export default page;

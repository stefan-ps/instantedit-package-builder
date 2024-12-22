// import type {
//   Event,
//   EventPackage,
//   Section,
//   ServicePackage,
//   Subsection,
// } from '~/types/section';

import type {
  Event,
  EventPackage,
  EventPackageMetadata,
  Section,
  ServicePackage,
  ServicePackageMetadata,
} from '~/types/api';

// export const data = {
//   sections: [
//     {
//       id: 1,
//       type: 'event',
//       title: 'Build Your Coverage',
//       description:
//         'Select the events you want us to capture, from pre-wedding celebrations to your big day',
//       coverUrl:
//         'https://www.theweddingmission.com/wp-content/uploads/2023/06/TorieKev-410-scaled.jpg',
//       subsections: [
//         {
//           id: 1,
//           title: undefined,
//           description: undefined,
//           type: 'tile',
//           elements: [
//             {
//               id: 1,
//               title: 'Ceremony Only',
//               duration: 6,
//               events: [{ id: 1, title: 'Wedding Ceremony', type: 'event' }],
//             } as EventPackage,
//             {
//               id: 2,
//               title: 'Wedding Day Events: Ceremony & Reception',
//               duration: 12,
//               events: [
//                 { id: 1, title: 'Wedding Ceremony', type: 'event' },
//                 { id: 2, title: 'Reception Celebration', type: 'event' },
//               ],
//             } as EventPackage,
//             {
//               id: 3,
//               title: 'Wedding Day Events + One Pre-Ceremony',
//               duration: 18,
//               events: [
//                 { id: 1, title: 'Wedding Ceremony', type: 'event' },
//                 { id: 2, title: 'Reception Celebration', type: 'event' },
//                 { id: 3, title: 'Sungeet', type: 'pre-ceremony' },
//               ],
//             } as EventPackage,
//             {
//               id: 4,
//               title: 'Extended Coverage: Multi-Day Indian Wedding',
//               duration: 24,
//               events: [
//                 { id: 1, title: 'Wedding Ceremony', type: 'event' } as Event,
//                 { id: 2, title: 'Reception Celebration', type: 'event' },
//                 { id: 3, title: 'Sungeet', type: 'pre-ceremony' },
//                 { id: 4, title: 'Pithi', type: 'pre-ceremony' },
//                 { id: 5, title: 'Mehndi', type: 'pre-ceremony' },
//               ],
//             } as EventPackage,
//           ] as EventPackage[],
//         } as Subsection<EventPackage>,
//         {
//           id: 2,
//           title: 'Customize your Coverage',
//           description: undefined,
//           type: 'badge',
//           elements: [
//             {
//               id: 1,
//               title: 'Wedding Ceremony',
//               duration: 18,
//             } as Event,
//             {
//               id: 2,
//               title: 'Reception Celebration',
//               duration: 18,
//             } as Event,
//           ] as Event[],
//         } as Subsection<Event>,
//         {
//           id: 3,
//           title: 'Ceremony Types',
//           description: undefined,
//           type: 'badge',
//           elements: [
//             {
//               id: 3,
//               title: 'Sungeet',
//               duration: 6,
//             } as Event,
//             {
//               id: 4,
//               title: 'Pithi',
//               duration: 6,
//             },
//             {
//               id: 5,
//               title: 'Mehndi',
//               duration: 6,
//             },
//           ] as Event[],
//         } as Subsection<Event>,
//       ] as Subsection<Event>[],
//     } as Section,
//     {
//       id: 2,
//       type: 'package',
//       title: 'Photography Coverage',
//       description: undefined,
//       coverUrl:
//         'https://torikelner.com/wp-content/uploads/2020/04/Tori-Kelner-Photography-Ceremony-4-1536x1028.jpg',
//       subsections: [
//         {
//           id: 4,
//           title: undefined,
//           type: 'tile',
//           elements: [
//             {
//               id: 1,
//               title: 'Essentials Package',
//               description:
//                 'One photographer, perfect for small intimate weddings',
//               price: 2000,
//               comparable: [
//                 'One Photographer',
//                 'Professional Posing & Coaching',
//                 'Family Portrait Session',
//               ],
//               addons: [],
//             } as ServicePackage,
//             {
//               id: 2,
//               title: 'Premier Package',
//               description:
//                 'One photographer, perfect for small intimate weddings',
//               price: 3000,
//               comparable: [
//                 'One Photographer',
//                 'Professional Posing & Coaching',
//                 '2x Family Portrait Session',
//               ],
//               addons: [],
//             } as ServicePackage,
//           ] as ServicePackage[],
//         } as Subsection<ServicePackage>,
//         {
//           id: 5,
//           title: 'Choose your addons',
//           type: 'tile',
//           elements: [
//             {
//               id: 1,
//               title: 'Engagement Shoot',
//               description:
//                 'Capture your love story with a 2-hour engagement shoot, including a set of professionally edited images.',
//               price: 3000,
//             },
//             {
//               id: 2,
//               title: "Couple's Wedding Album",
//               description:
//                 'Capture your love story with a 2-hour engagement shoot, including a set of professionally edited images.',
//               price: 3000,
//             },
//             {
//               id: 3,
//               title: "Parent's Wedding Album",
//               description:
//                 'Flush mount 12x12 hardcover wedding album, complete with 15 spreads holding 75 images',
//               price: 3000,
//             },
//           ],
//         } as Subsection<ServicePackage>,
//       ],
//     },
//     {
//       id: 3,
//       type: 'package',
//       title: 'Cinematography Coverage',
//       description: undefined,
//       coverUrl:
//         'https://x.dkphoto.ie/wp-content/uploads/2024/03/Brides-Guide-to-Selecting-the-Perfect-Wedding-Dress-1290x861.jpg.webp',
//       subsections: [
//         {
//           id: 6,
//           title: undefined,
//           type: 'tile',
//           elements: [
//             {
//               id: 3,
//               title: 'Simple Coverage',
//               description:
//                 'One cinematographer, single-camera coverage, highlight film, and raw footage delivery',
//               price: 2000,
//               comparable: [
//                 'One Photographer',
//                 'Professional Posing & Coaching',
//                 'Family Portrait Session',
//               ],
//               addons: [],
//             },
//             {
//               id: 4,
//               title: 'Premium Coverage',
//               description:
//                 'Two-camera coverage, lite drone footage, highlight film, and full-length video.',
//               price: 3000,
//               comparable: [
//                 'One Photographer',
//                 'Professional Posing & Coaching',
//                 '2x Family Portrait Session',
//               ],
//               addons: [
//                 {
//                   id: 4,
//                   title: 'Studio Lighting & Full Drone Upgrade',
//                   description:
//                     'Capture your love story with a 2-hour engagement shoot, including a set of professionally edited images.',
//                   price: 3000,
//                 },
//               ],
//             },
//             {
//               id: 5,
//               title: 'Max Coverage',
//               description:
//                 'Two cinematographers, three-camera angles, full drone coverage, highlight film, and full-length video',
//               price: 3000,
//               comparable: [
//                 'One Photographer',
//                 'Professional Posing & Coaching',
//                 '2x Family Portrait Session',
//               ],
//               addons: [],
//             },
//           ] as ServicePackage[],
//         } as Subsection<ServicePackage>,
//         {
//           id: 7,
//           title: 'Choose your addons',
//           type: 'tile',
//           elements: [
//             {
//               id: 4,
//               title: 'Studio Lighting & Full Drone Upgrade',
//               description:
//                 'Capture your love story with a 2-hour engagement shoot, including a set of professionally edited images.',
//               price: 3000,
//             },
//           ],
//         },
//       ] as Subsection<ServicePackage>[],
//     } as Section,
//   ] as Section[],
// } as { sections: Section[] };

export const data = {
  sections: [
    {
      id: 1,
      type: 'event',
      title: 'Build Your Coverage',
      slug: 'event-package',
      description:
        'Select the events you want us to capture, from pre-wedding celebrations to your big day',
      coverUrl:
        'https://www.theweddingmission.com/wp-content/uploads/2023/06/TorieKev-410-scaled.jpg',
      metadata: {
        id: 1,
        title: undefined,
        description: undefined,
        // type: 'tile',
        packages: [
          {
            id: 1,
            title: 'Ceremony Only',
            duration: 6,
            events: [{ id: 1, title: 'Wedding Ceremony', type: 'ceremony' }],
          } as EventPackage,
          {
            id: 2,
            title: 'Wedding Day Events: Ceremony & Reception',
            duration: 12,
            events: [
              { id: 1, title: 'Wedding Ceremony', type: 'ceremony' },
              { id: 2, title: 'Reception Celebration', type: 'ceremony' },
            ],
          } as EventPackage,
          {
            id: 3,
            title: 'Wedding Day Events + One Pre-Ceremony',
            duration: 18,
            events: [
              { id: 1, title: 'Wedding Ceremony', type: 'event' },
              { id: 2, title: 'Reception Celebration', type: 'event' },
              { id: 3, title: 'Sungeet', type: 'pre-ceremony' },
            ],
          } as EventPackage,
          {
            id: 4,
            title: 'Extended Coverage: Multi-Day Indian Wedding',
            duration: 24,
            events: [
              { id: 1, title: 'Wedding Ceremony', type: 'ceremony' } as Event,
              { id: 2, title: 'Reception Celebration', type: 'ceremony' },
              { id: 3, title: 'Sungeet', type: 'pre-ceremony' },
              { id: 4, title: 'Pithi', type: 'pre-ceremony' },
              { id: 5, title: 'Mehndi', type: 'pre-ceremony' },
            ],
          } as EventPackage,
        ] as EventPackage[],
        eventTypes: [
          {
            id: 1,
            title: 'Customize your coverage',
            value: 'ceremony',
          },
          {
            id: 2,
            title: 'Ceremony Type',
            value: 'pre-ceremony',
          },
        ],
      } as EventPackageMetadata,
      // {
      //   id: 2,
      //   title: 'Customize your Coverage',
      //   description: undefined,
      //   type: 'badge',
      //   elements: [
      //     {
      //       id: 1,
      //       title: 'Wedding Ceremony',
      //       duration: 18,
      //     } as Event,
      //     {
      //       id: 2,
      //       title: 'Reception Celebration',
      //       duration: 18,
      //     } as Event,
      //   ] as Event[],
      // } as Subsection<Event>,
      // {
      //   id: 3,
      //   title: 'Ceremony Types',
      //   description: undefined,
      //   type: 'badge',
      //   elements: [
      //     {
      //       id: 3,
      //       title: 'Sungeet',
      //       duration: 6,
      //     } as Event,
      //     {
      //       id: 4,
      //       title: 'Pithi',
      //       duration: 6,
      //     },
      //     {
      //       id: 5,
      //       title: 'Mehndi',
      //       duration: 6,
      //     },
      //   ] as Event[],
      // } as Subsection<Event>,
    } as Section,
    {
      id: 2,
      type: 'package',
      title: 'Photography Coverage',
      slug: 'photography',
      description: undefined,
      coverUrl:
        'https://torikelner.com/wp-content/uploads/2020/04/Tori-Kelner-Photography-Ceremony-4-1536x1028.jpg',
      metadata: {
        id: 4,
        title: undefined,
        // type: 'tile',
        packages: [
          {
            id: 1,
            title: 'Essentials Package',
            description:
              'One photographer, perfect for small intimate weddings',
            price: 2000,
            comparable: [
              'One Photographer',
              'Professional Posing & Coaching',
              'Family Portrait Session',
            ],
            addons: [],
          } as ServicePackage,
          {
            id: 2,
            title: 'Premier Package',
            description:
              'One photographer, perfect for small intimate weddings',
            price: 3000,
            comparable: [
              'One Photographer',
              'Professional Posing & Coaching',
              '2x Family Portrait Session',
            ],
            addons: [],
          } as ServicePackage,
        ] as ServicePackage[],
        addons: [
          {
            id: 1,
            title: 'Engagement Shoot',
            description:
              'Capture your love story with a 2-hour engagement shoot, including a set of professionally edited images.',
            price: 3000,
          },
          {
            id: 2,
            title: "Couple's Wedding Album",
            description:
              'Capture your love story with a 2-hour engagement shoot, including a set of professionally edited images.',
            price: 3000,
          },
          {
            id: 3,
            title: "Parent's Wedding Album",
            description:
              'Flush mount 12x12 hardcover wedding album, complete with 15 spreads holding 75 images',
            price: 3000,
          },
        ],
        extras: {
          addonsTitleText: 'Choose your add-ons',
          comparePackagesText: 'Compare plans',
          helpActionText: 'Watch video',
          helpText: 'Not sure what option is best for you?',
        },
      } as ServicePackageMetadata,
    } as Section,
    {
      id: 3,
      type: 'package',
      title: 'Cinematography Coverage',
      description: undefined,
      slug: 'cinematography',
      coverUrl:
        'https://x.dkphoto.ie/wp-content/uploads/2024/03/Brides-Guide-to-Selecting-the-Perfect-Wedding-Dress-1290x861.jpg.webp',
      metadata: {
        id: 6,
        title: undefined,
        // type: 'tile',
        packages: [
          {
            id: 3,
            title: 'Simple Coverage',
            description:
              'One cinematographer, single-camera coverage, highlight film, and raw footage delivery',
            price: 2000,
            comparable: [
              'One Photographer',
              'Professional Posing & Coaching',
              'Family Portrait Session',
            ],
            addons: [],
          },
          {
            id: 4,
            title: 'Premium Coverage',
            description:
              'Two-camera coverage, lite drone footage, highlight film, and full-length video.',
            price: 3000,
            comparable: [
              'One Photographer',
              'Professional Posing & Coaching',
              '2x Family Portrait Session',
            ],
            addons: [
              {
                id: 4,
                title: 'Studio Lighting & Full Drone Upgrade',
                description:
                  'Capture your love story with a 2-hour engagement shoot, including a set of professionally edited images.',
                price: 3000,
              },
            ],
          },
          {
            id: 5,
            title: 'Max Coverage',
            description:
              'Two cinematographers, three-camera angles, full drone coverage, highlight film, and full-length video',
            price: 3000,
            comparable: [
              'One Photographer',
              'Professional Posing & Coaching',
              '2x Family Portrait Session',
            ],
            addons: [],
          },
        ] as ServicePackage[],
        extras: {
          addonsTitleText: 'Choose your add-ons',
          comparePackagesText: 'Compare plans',
          helpActionText: 'Watch video',
          helpText: 'Not sure what option is best for you?',
        },
      } as ServicePackageMetadata,
    } as Section,
  ] as Section[],
} as { sections: Section[] };

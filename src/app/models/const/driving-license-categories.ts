import { Injectable } from '@angular/core';

@Injectable()
export class DrivingLicensesGlossary {

  types_6 = [
    { id: 13,  display: 'Catégorie 1 : transpalette à conducteur porté' },
    { id: 14,  display: 'Catégorie 2 : tracteur ou porteur cap. max. 6t' },
    { id: 15,  display: 'Catégorie 3 : porte-à-faux cap. max. 6t' },
    { id: 16,  display: 'Catégorie 4 : porte-à-faux cap. + 6t' },
    { id: 17,  display: 'Catégorie 5 : mat rétractable' },
    { id: 18,  display: 'Catégorie 6 : conduite hors production' },
    { id: 19,  display: 'Complément de formation engins spéciaux (5+)' }
  ];

  types_7 = [
    { id: 20,  display: 'Catégorie 1/A : stabilisée, élévation verticale' },
    { id: 21,  display: 'Catégorie 1/B : stabilisée, élévation multidirectionnelle' },
    { id: 22,  display: 'Catégorie 2/A : sur véhicule roulant, élévation verticale' },
    { id: 23,  display: 'Catégorie 2/B : sur véhicule roulant, élévation multidirectionnelle' },
    { id: 24,  display: 'Catégorie 3/A : automotrice, élévation verticale' },
    { id: 25,  display: 'Catégorie 3/B : automotrice, élévation multidirectionnelle' }
  ];

  types_8 = [
    { id: 26,  display: 'Cabine' },
    { id: 27,  display: 'Conduite au sol : filaire, télécommande, radiocommande' }
  ];

  types_9 = [
    { id: 28,  display: 'Catégorie 1 : tracteurs et petits engins de chantier mobiles' },
    { id: 29,  display: 'Catégorie 2 : engins d’extraction et/ou de chargement à déplacement séquentiel' },
    { id: 30,  display: 'Catégorie 3 : engins d’extraction à déplacement alternatif' },
    { id: 31,  display: 'Catégorie 4 : engins de chargement à déplacement alternatif' },
    { id: 32,  display: 'Catégorie 5 : engins de finition à déplacement lent' },
    { id: 33,  display: 'Catégorie 6 : engins de réglage à déplacement alternatif' },
    { id: 34,  display: 'Catégorie 7 : engins de compactage à déplacement alternatif' },
    { id: 35,  display: 'Catégorie 8 : engins de transport ou d’extraction-transport' },
    { id: 36,  display: 'Catégorie 9 : engins de manutention' },
    { id: 37,  display: 'Catégorie 10 : conduite hors production' }
  ];

  types_11 = [
    { id: 38,  display: 'Grue à montage automatisé conduite au sol' },
    { id: 39,  display: 'Grue à montage automatisé conduite en cabine' },
    { id: 40,  display: 'Grue à montage par éléments' }
  ];


  types_12_routier = [
    { id: 41,  display: 'Automotrice immatriculée' },
    { id: 42,  display: 'Automotrice non immatriculée' },
    { id: 43,  display: 'Sur porteur automoteur' },
    { id: 44,  display: 'Tractée' }
  ];
  types_12_nonRoutier = [
    { id: 45,  display: 'Sur chenilles' },
    { id: 46,  display: 'Sur bandage ou rail' },
    { id: 47,  display: 'Sur ponton' }
  ];
  types_12_equipement = [
    { id: 1,  display: 'A - Treillis' },
    { id: 2,  display: 'B - Télescopique avec fléchette' },
    { id: 3,  display: 'B - Télescopique sans fléchette' },
    { id: 4,  display: 'C - Spécial' }
  ];

}

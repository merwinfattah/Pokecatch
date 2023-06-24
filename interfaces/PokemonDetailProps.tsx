export default interface PokemonDetailProps {
    id: number;
    name: string;
    types: [
        {
            slot: number;
            type: {
                name: string;
                url: string;
            }
        }
    ];
    height: number;
    weight: number;
    abilities: [
        {
            is_hidden: boolean;
            slot: number;
            ability: {
                name: string;
                url: string;
            }
        }
    ];
    stats: [
        {
            base_stat: number;
            effort: number;
            stat: {
                name: string;
                url: string;
            }
        }
    ];
    moves: [
        {
            move: {
                name: string;
                url: string;
            };
            version_group_details: [
                {
                    level_learned_at: number;
                    version_group: {
                        name: string;
                        url: string;
                    };
                    move_learn_method: {
                        name: string;
                        url: string;
                    };
                }
            ];
        }
    ]

}
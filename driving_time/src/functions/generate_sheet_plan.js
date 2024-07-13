import { ranges_count, range_length, vertical_step, mid_max } from "./consts"

export const generateSheetPlan = () => {
    const ranges = {}

    const letters = {
        ordered: {3: 'A00', 2: 'B00', 1: 'C00'},
        reversed: {3: 'C00', 2: 'B00', 1: 'A00'},
        e3_case_ordered: {
            first: {3: 'A01', 2: 'B01', 1: 'C01'},
            second: {3: 'A02', 2: 'B02', 1: 'C02'}
        },
        e3_case_reversed: {
            first: {3: 'C02', 2: 'B02', 1: 'A02'},
            second : {3: 'C01', 2: 'B01', 1: 'A01'}
        }
    }

    let mid_offset = 0

    for (let i = 1 ; i <= ranges_count ; i++){
        const range_prefix = "E" + (ranges_count < 10 ? "0" + i : i)
        let next = vertical_step + 1,
            current_count = 1
        ranges[range_prefix] = {}
        for (let j = 1 ; j < range_length ; j++){
            if (j == mid_max){
                const odd_range_mid = `${range_prefix}-${31}-D00`
                const even_range_mid = `${range_prefix}-${32}-D00`
                ranges[range_prefix][odd_range_mid] = j
                ranges[range_prefix][even_range_mid] = j
                mid_offset = 1
            }
            if (next - j == 0){
                next = j + vertical_step
                current_count += 2
            }
            if (range_prefix != "E03"){
                const letter_ordered = letters.ordered[next-j]
                const letter_reversed = letters.reversed[next-j]
                const odd_count = String(current_count).padStart(2, '0')
                const even_count = String(current_count+1).padStart(2, '0')
                const odd_range = `${range_prefix}-${odd_count}-${letter_ordered}`
                const even_range = `${range_prefix}-${even_count}-${letter_reversed}`
                ranges[range_prefix][odd_range] = j + mid_offset
                ranges[range_prefix][even_range] = j + mid_offset
            } else {
                const first_letter_ordered = letters.e3_case_ordered.first[next-j]
                const second_letter_ordered = letters.e3_case_ordered.second[next-j]
                const first_letter_reversed = letters.e3_case_reversed.first[next-j]
                const second_letter_reversed = letters.e3_case_reversed.second[next-j]
                const odd_count = String(current_count).padStart(2, '0')
                const even_count = String(current_count+1).padStart(2, '0')
                const first_odd_range = `${range_prefix}-${odd_count}-${first_letter_ordered}`
                const second_odd_range = `${range_prefix}-${odd_count}-${second_letter_ordered}`
                const first_even_range = `${range_prefix}-${even_count}-${first_letter_reversed}`
                const second_even_range = `${range_prefix}-${even_count}-${second_letter_reversed}`
                ranges[range_prefix][first_odd_range] = j + mid_offset
                ranges[range_prefix][second_odd_range] = j + mid_offset
                ranges[range_prefix][first_even_range] = j + mid_offset
                ranges[range_prefix][second_even_range] = j + mid_offset
            }
        }
        mid_offset = 0
    }

    console.log(ranges)
    return ranges
}
import { useEffect } from "react"
import { ranges_count, range_length, vertical_step, lateral_step, mid_min, mid_max } from "./consts"

export const getPathData = ({data, sheetPlan}) => {
    const data_splitted = data.trim().split('\n')

    let current_element = null,
        current_prefix = null

    let sum = 0
    const output = []
    const errors = []
    const infos = []

    if (data_splitted.length >= 2){
        current_element = data_splitted[0]
        current_prefix = current_element.split('-')[0]

        if (checkFormat(current_element) && existInStorage(sheetPlan, current_prefix, current_element)){
            sum = (+current_prefix.slice(1)-1) * lateral_step + sheetPlan[current_prefix][current_element]
            infos.push(`Distance initiale : ${sum} mètres.`)

            for (let i = 1 ; i < data_splitted.length ; i++){
                const next_element = data_splitted[i]
                if (!checkFormat(next_element)){
                    errors.push(`${next_element} : format invalide.`)
                    continue
                }
                const next_prefix = next_element.split('-')[0]

                if (!existInStorage(sheetPlan, next_prefix, next_element)){    
                    errors.push(`${next_element} : inexistant dans l'entrepôt.`)
                    continue
                }

                const lateral_distance = Math.abs(+current_prefix.slice(1) - +next_prefix.slice(1)) * lateral_step
                const current_distance = sheetPlan[current_prefix][current_element]
                const next_distance = sheetPlan[next_prefix][next_element]
                const vertical_distance = Math.abs(current_distance - next_distance)

                if (current_distance >= mid_min && current_distance <= mid_max &&
                    next_distance >= mid_min && next_distance <= mid_max && 
                    current_prefix != next_prefix)
                {
                    sum += vertical_distance
                    output.push({compared: `${current_element} => ${next_element}`, best_way: 'par le pont', meters: vertical_distance + lateral_distance})
                } else if (current_prefix == next_prefix){
                    sum += vertical_distance
                    output.push({compared: `${current_element} => ${next_element}`, best_way: 'même allée', meters: vertical_distance})
                } else {
                    const by_down = vertical_distance + current_distance
                    const by_mid = Math.abs(current_distance <= mid_min ? mid_min - current_distance : 
                                            current_distance >= mid_max ? current_distance - mid_max : 
                                            0) + vertical_distance
                    const by_up = ((range_length + 1) - current_distance) + ((range_length + 1) - next_distance)
                    const getter = {[by_down]: "par le début d'allée", [by_mid]: "par le pont", [by_up]: "par le fond d'allée"}

                    if (by_down == by_mid){
                        sum += by_mid
                        output.push({compared: `${current_element} => ${next_element}`, best_way: 'bas | milieu', meters: by_mid + lateral_distance})
                    } else if (by_up == by_mid){
                        sum += by_mid
                        output.push({compared: `${current_element} => ${next_element}`, best_way: 'haut | milieu', meters: by_mid + lateral_distance})
                    } else {
                        const smallest_distance = Math.min(by_down, by_mid, by_up)
                        sum += smallest_distance
                        output.push({compared: `${current_element} => ${next_element}`, best_way: getter[smallest_distance], meters: smallest_distance + lateral_distance - 1})
                    }
                }

                sum += lateral_distance
                current_element = next_element
                current_prefix = next_prefix
            }

            if (checkFormat(current_element) && existInStorage(sheetPlan, current_prefix, current_element)){
                const last_distance = (+current_prefix.slice(1)-1) * lateral_step + sheetPlan[current_prefix][current_element]
                sum += last_distance
                infos.push(`Distance finale : ${last_distance} mètres.`)
            }
        } else {
            if (!checkFormat(current_element)){
                errors.push("Premier élément : format invalide.")
            } else if (checkFormat(current_element) && !existInStorage(sheetPlan, current_prefix, current_element)){
                errors.push("Premier élément : inexistant dans l'entrepôt.")
            }
        }
    } else if (data_splitted.length == 1){
        current_element = data_splitted[0]
        current_prefix = current_element.split('-')[0]
        if (checkFormat(current_element) && existInStorage(sheetPlan, current_prefix, current_element)){
            sum = ((+current_prefix.slice(1)-1) * lateral_step) * 2 + (sheetPlan[current_prefix][current_element] * 2)
            output.push({compared: `${current_element}`, best_way: 'aller retour simple', meters: sum})
            infos.push(`Un seul élément a été entré, l'aller retour entier a été calculé pour cet élément.`)
        } else {
            if (!checkFormat(current_element)){
                errors.push("Premier élément : format invalide.")
            } else if (checkFormat(current_element) && !existInStorage(sheetPlan, current_prefix, current_element)){
                errors.push("Premier élément : inexistant dans l'entrepôt.")
            }
        }
    }
    return {output, errors, infos, sum}
}

const checkFormat = element => /^E\d{2}-\d{2}-[A-Z]\d{2}$/.test(element)


const existInStorage = (sheetPlan, prefix, element) => {
    if (!sheetPlan[prefix] || !sheetPlan[prefix][element]){
        return false
    }
    return true
}
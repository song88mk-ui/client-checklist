<script lang="ts">
    import { ClientRowStatus } from "../enums/ClientRowStatus";

    export let status: ClientRowStatus = ClientRowStatus.InProgress
    let statusCss = "px-5 py-2 rounded-[50px] text-[12px] font-[600] leading-[15px] w-fit ";
    let statusText = ""

    switch(status) {
        case ClientRowStatus.InProgress:
            statusCss += "bg-[#FAE9DC] text-[#EF7E1D]";
            statusText = "In Progress"
            break;
        case ClientRowStatus.Completed:
            // Update this to proper colors, not in mockup yet
            statusCss += "bg-[#FAE9DC] text-[#EF7E1D]";
            statusText = "Completed";
        default:
            break;
    }
</script>

<div class={statusCss}>{statusText}</div>